import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class InviteUserDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  roleId?: string;
}
