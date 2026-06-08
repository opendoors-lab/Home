import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(3)
  title!: string;

  @IsString()
  body!: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  coverImageUrl?: string;
}
