import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { classToPlain } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  password: string;
}

export class RegistrationDTO extends LoginDTO {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty()
  username: string;
}

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsOptional()
  @ApiProperty()
  image: string;

  @IsOptional()
  @ApiProperty()
  bio: string;
}

export interface AuthPayload {
  username: string;
}
export interface UserResponse {
  email: string;
  username?: string;
  bio: string;
  image: string | null;
}

export interface AuthResponse extends UserResponse {
  token: string;
}

export interface ProfileResponse extends UserResponse {
  following: boolean | null;
}