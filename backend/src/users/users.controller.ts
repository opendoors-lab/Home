import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PERMISSIONS } from '@company/shared';
import { RequirePermissions } from '../common/decorators/require-permissions.decorator';
import { OwnerOnly } from '../common/decorators/owner-only.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthUser } from '../common/types/auth-user';
import { UsersService } from './users.service';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { BootstrapAdminDto } from './dto/bootstrap-admin.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @RequirePermissions(PERMISSIONS.INVITE_USER)
  @Post('users/invite')
  invite(@Body() dto: InviteUserDto, @CurrentUser() user: AuthUser) {
    return this.usersService.invite(dto, user);
  }

  @OwnerOnly()
  @Post('users/bootstrap-admin')
  bootstrapAdmin(
    @Body() dto: BootstrapAdminDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.usersService.bootstrapAdmin(dto, user);
  }

  @RequirePermissions(PERMISSIONS.MANAGE_USERS)
  @Get('users')
  listUsers() {
    return this.usersService.listUsers();
  }

  @RequirePermissions(PERMISSIONS.MANAGE_USERS)
  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @RequirePermissions(PERMISSIONS.MANAGE_USERS)
  @Patch('users/:id')
  updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.usersService.updateUser(id, dto, user);
  }

  @RequirePermissions(PERMISSIONS.ASSIGN_ROLES)
  @Post('users/:id/roles')
  assignRole(
    @Param('id') id: string,
    @Body() dto: AssignRoleDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.usersService.assignRole(id, dto.roleId, user);
  }

  @OwnerOnly()
  @Get('role-assignments/pending')
  listPending() {
    return this.usersService.listPendingAssignments();
  }

  @OwnerOnly()
  @Post('role-assignments/:id/approve')
  approveAssignment(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.usersService.approveAssignment(id, user);
  }

  @OwnerOnly()
  @Post('role-assignments/:id/reject')
  rejectAssignment(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.usersService.rejectAssignment(id, user);
  }
}
