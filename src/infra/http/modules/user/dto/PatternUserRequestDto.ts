import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../../../../modules/User/types/Roles.enum.js';

export class PatternUserRequestDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  role!: Role;

  @IsString()
  img_url!: string;
}
