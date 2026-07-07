import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountStatus, AssignmentStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../common/services/audit.service';
import { MailerService } from '../common/services/mailer.service';
import { PermissionsService } from '../common/services/permissions.service';
import { AuthService } from '../auth/auth.service';
import { AuthUser } from '../common/types/auth-user';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BootstrapAdminDto } from './dto/bootstrap-admin.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
    private readonly mailer: MailerService,
    private readonly auth: AuthService,
    private readonly config: ConfigService,
    private readonly permissions: PermissionsService,
  ) {}

  async invite(dto: InviteUserDto, actor: AuthUser) {
    const email = dto.email.toLowerCase().trim();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('User already exists');

    const user = await this.prisma.user.create({
      data: {
        email,
        name: dto.name,
        accountStatus: AccountStatus.INVITED,
        invitedById: actor.isOwner ? null : actor.id,
      },
    });

    await this.audit.log(actor.id, 'USER_INVITED', 'User', user.id, {
      email,
    });

    if (dto.roleId) {
      await this.assignRole(user.id, dto.roleId, actor);
    }

    await this.auth.provisionUserPassword(email, dto.name);
    return this.toUserDto(user);
  }

  async bootstrapAdmin(dto: BootstrapAdminDto, actor: AuthUser) {
    const email = dto.email.toLowerCase().trim();
    const adminRole = await this.prisma.role.findUnique({
      where: { name: 'System Admin' },
    });
    if (!adminRole) throw new BadRequestException('System Admin role not seeded');

    let user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name: dto.name ?? 'System Admin',
          accountStatus: AccountStatus.ACTIVE,
        },
      });
    } else {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { accountStatus: AccountStatus.ACTIVE },
      });
    }

    await this.prisma.userRole.upsert({
      where: { userId_roleId: { userId: user.id, roleId: adminRole.id } },
      update: {
        status: AssignmentStatus.APPROVED,
        approvedById: actor.id,
      },
      create: {
        userId: user.id,
        roleId: adminRole.id,
        status: AssignmentStatus.APPROVED,
        assignedById: actor.id,
        approvedById: actor.id,
      },
    });

    await this.audit.log(actor.id, 'BOOTSTRAP_ADMIN', 'User', user.id, {
      email,
    });

    await this.auth.provisionUserPassword(email, dto.name ?? 'System Admin');

    return this.toUserDto(user);
  }

  async listUsers() {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        roles: { include: { role: true } },
      },
    });
    return users.map((u) => ({
      ...this.toUserDto(u),
      roles: u.roles.map((r) => ({
        id: r.id,
        roleName: r.role.name,
        status: r.status,
      })),
    }));
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { roles: { include: { role: true } } },
    });
    if (!user) throw new NotFoundException('User not found');
    return {
      ...this.toUserDto(user),
      roles: user.roles.map((r) => ({
        id: r.id,
        roleId: r.roleId,
        roleName: r.role.name,
        status: r.status,
      })),
    };
  }

  async updateUser(id: string, dto: UpdateUserDto, actor: AuthUser) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    if (this.permissions.isOwner(user.email)) {
      if (dto.accountStatus && dto.accountStatus !== AccountStatus.ACTIVE) {
        throw new ForbiddenException('Owner account status cannot be changed');
      }
      if (dto.name !== undefined) {
        throw new ForbiddenException('Owner profile cannot be modified here');
      }
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: dto,
    });

    if (dto.accountStatus === AccountStatus.DISABLED) {
      await this.audit.log(actor.id, 'USER_DISABLED', 'User', id);
    }

    return this.toUserDto(updated);
  }

  async assignRole(userId: string, roleId: string, actor: AuthUser) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const role = await this.prisma.role.findUnique({ where: { id: roleId } });
    if (!user || !role) throw new NotFoundException();

    const assignment = await this.prisma.userRole.upsert({
      where: { userId_roleId: { userId, roleId } },
      update: { status: AssignmentStatus.PENDING_OWNER_REVIEW },
      create: {
        userId,
        roleId,
        status: AssignmentStatus.PENDING_OWNER_REVIEW,
        assignedById: actor.id,
      },
      include: { role: true, user: true },
    });

    await this.audit.log(actor.id, 'ROLE_ASSIGNED', 'UserRole', assignment.id, {
      userId,
      roleId,
      roleName: role.name,
    });

    const ownerEmail = this.config.get<string>('OWNER_EMAIL');
    if (ownerEmail) {
      await this.mailer.sendRoleAssignmentPending(
        ownerEmail,
        user.email,
        role.name,
      );
    }

    return {
      id: assignment.id,
      userId,
      userEmail: user.email,
      userName: user.name,
      roleId,
      roleName: role.name,
      status: assignment.status,
      assignedById: assignment.assignedById,
      createdAt: assignment.createdAt.toISOString(),
    };
  }

  async revokeRole(userId: string, assignmentId: string, actor: AuthUser) {
    const assignment = await this.prisma.userRole.findUnique({
      where: { id: assignmentId },
      include: { user: true, role: true },
    });
    if (!assignment || assignment.userId !== userId) {
      throw new NotFoundException('Role assignment not found');
    }
    if (this.permissions.isOwner(assignment.user.email)) {
      throw new ForbiddenException('Cannot remove roles from the owner account');
    }

    await this.prisma.userRole.delete({ where: { id: assignmentId } });

    await this.audit.log(actor.id, 'ROLE_REVOKED', 'UserRole', assignmentId, {
      userId,
      roleId: assignment.roleId,
      roleName: assignment.role.name,
    });

    return { ok: true };
  }

  async listPendingAssignments() {
    const items = await this.prisma.userRole.findMany({
      where: { status: AssignmentStatus.PENDING_OWNER_REVIEW },
      include: { user: true, role: true },
      orderBy: { createdAt: 'desc' },
    });
    return items.map((a) => ({
      id: a.id,
      userId: a.userId,
      userEmail: a.user.email,
      userName: a.user.name,
      roleId: a.roleId,
      roleName: a.role.name,
      status: a.status,
      assignedById: a.assignedById,
      createdAt: a.createdAt.toISOString(),
    }));
  }

  async approveAssignment(id: string, actor: AuthUser) {
    const assignment = await this.prisma.userRole.findUnique({
      where: { id },
      include: { user: true, role: true },
    });
    if (!assignment) throw new NotFoundException();
    if (assignment.status !== AssignmentStatus.PENDING_OWNER_REVIEW) {
      throw new BadRequestException('Assignment not pending');
    }

    const updated = await this.prisma.userRole.update({
      where: { id },
      data: {
        status: AssignmentStatus.APPROVED,
        approvedById: actor.id,
      },
    });

    await this.audit.log(actor.id, 'ROLE_ASSIGNMENT_APPROVED', 'UserRole', id);
    return updated;
  }

  async rejectAssignment(id: string, actor: AuthUser) {
    const assignment = await this.prisma.userRole.findUnique({ where: { id } });
    if (!assignment) throw new NotFoundException();

    const updated = await this.prisma.userRole.update({
      where: { id },
      data: { status: AssignmentStatus.REJECTED, approvedById: actor.id },
    });

    await this.audit.log(actor.id, 'ROLE_ASSIGNMENT_REJECTED', 'UserRole', id);
    return updated;
  }

  private toUserDto(user: {
    id: string;
    email: string;
    name: string | null;
    accountStatus: AccountStatus;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      accountStatus: user.accountStatus,
      isOwner: this.permissions.isOwner(user.email),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
