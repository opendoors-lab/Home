import { IsString, MinLength } from 'class-validator';

export class RejectPostDto {
  @IsString()
  @MinLength(3)
  comment!: string;
}
