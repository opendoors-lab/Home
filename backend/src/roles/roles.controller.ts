import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OwnerOnly } from '../common/decorators/owner-only.decorator';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @OwnerOnly()
  @Get('permissions')
  listPermissions() {
    return this.rolesService.listPermissions();
  }

  @OwnerOnly()
  @Get('roles')
  listRoles() {
    return this.rolesService.listRoles();
  }

  @OwnerOnly()
  @Post('roles')
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @OwnerOnly()
  @Patch('roles/:id')
  updateRole(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.rolesService.updateRole(id, dto);
  }

  @OwnerOnly()
  @Delete('roles/:id')
  deleteRole(@Param('id') id: string) {
    return this.rolesService.deleteRole(id);
  }
}
