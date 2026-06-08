import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async listPermissions() {
    return this.prisma.permission.findMany({ orderBy: { key: 'asc' } });
  }

  async listRoles() {
    const roles = await this.prisma.role.findMany({
      include: {
        permissions: { include: { permission: true } },
      },
      orderBy: { name: 'asc' },
    });
    return roles.map((r) => this.toDto(r));
  }

  async createRole(dto: CreateRoleDto) {
    const perms = await this.prisma.permission.findMany({
      where: { key: { in: dto.permissionKeys } },
    });
    const role = await this.prisma.role.create({
      data: {
        name: dto.name,
        description: dto.description,
        permissions: {
          create: perms.map((p) => ({ permissionId: p.id })),
        },
      },
      include: {
        permissions: { include: { permission: true } },
      },
    });
    return this.toDto(role);
  }

  async updateRole(id: string, dto: UpdateRoleDto) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');

    if (
      role.isSystem &&
      dto.name !== undefined &&
      dto.name.trim() !== role.name
    ) {
      throw new BadRequestException('System role names cannot be changed');
    }

    if (dto.permissionKeys) {
      const perms = await this.prisma.permission.findMany({
        where: { key: { in: dto.permissionKeys } },
      });
      await this.prisma.rolePermission.deleteMany({ where: { roleId: id } });
      await this.prisma.rolePermission.createMany({
        data: perms.map((p) => ({ roleId: id, permissionId: p.id })),
      });
    }

    const data: { name?: string; description?: string } = {};
    if (!role.isSystem && dto.name !== undefined) data.name = dto.name;
    if (dto.description !== undefined) data.description = dto.description;

    const updated = await this.prisma.role.update({
      where: { id },
      data,
      include: {
        permissions: { include: { permission: true } },
      },
    });
    return this.toDto(updated);
  }

  async deleteRole(id: string) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) throw new NotFoundException('Role not found');
    if (role.isSystem) {
      throw new BadRequestException('Cannot delete system roles');
    }
    await this.prisma.role.delete({ where: { id } });
    return { ok: true };
  }

  private toDto(role: {
    id: string;
    name: string;
    description: string | null;
    isSystem: boolean;
    createdAt: Date;
    permissions: { permission: { key: string } }[];
  }) {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      isSystem: role.isSystem,
      permissionKeys: role.permissions.map((rp) => rp.permission.key),
      createdAt: role.createdAt.toISOString(),
    };
  }
}
