import { IsString, IsNotEmpty, IsDate, IsInt } from 'class-validator';

export class PatternPostRequestDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsNotEmpty()
  authorId!: string;

  @IsInt()
  @IsNotEmpty()
  uppoints!: number;

  @IsInt()
  @IsNotEmpty()
  downpoints!: number;

  father_post_id!: string;
}
