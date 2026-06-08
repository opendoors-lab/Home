import { IsString, MinLength } from 'class-validator';

export class VerifyDto {
  @IsString()
  @MinLength(10)
  token!: string;
}
