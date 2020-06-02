import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { classToPlain } from 'class-transformer';

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class RegistrationDTO extends LoginDTO {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  username: string;
}

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  image: string;

  @IsOptional()
  bio: string;
}

export interface AuthPayload {
  username: string;
}
