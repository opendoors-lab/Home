import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PERMISSIONS } from '@company/shared';
import { RequireAnyPermissions } from '../common/decorators/require-any-permissions.decorator';
import { RequirePermissions } from '../common/decorators/require-permissions.decorator';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @RequireAnyPermissions(PERMISSIONS.MANAGE_ROLES, PERMISSIONS.ASSIGN_ROLES)
  @Get('permissions')
  listPermissions() {
    return this.rolesService.listPermissions();
  }

  @RequireAnyPermissions(PERMISSIONS.MANAGE_ROLES, PERMISSIONS.ASSIGN_ROLES)
  @Get('roles')
  listRoles() {
    return this.rolesService.listRoles();
  }

  @RequirePermissions(PERMISSIONS.MANAGE_ROLES)
  @Post('roles')
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @RequirePermissions(PERMISSIONS.MANAGE_ROLES)
  @Patch('roles/:id')
  updateRole(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.rolesService.updateRole(id, dto);
  }

  @RequirePermissions(PERMISSIONS.MANAGE_ROLES)
  @Delete('roles/:id')
  deleteRole(@Param('id') id: string) {
    return this.rolesService.deleteRole(id);
  }
}
