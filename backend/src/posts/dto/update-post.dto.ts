import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  @IsOptional()
  @IsString()
  body?: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  coverImageUrl?: string;
}
