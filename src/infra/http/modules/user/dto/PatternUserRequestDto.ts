import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "../../../../../modules/User/types/Roles.js";


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
  password!: string

  @IsString()
  @IsNotEmpty()
  role!: Roles;
}