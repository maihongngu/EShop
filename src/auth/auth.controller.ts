import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDTO, LoginDTO } from 'src/models/user.model';
import { ApiTags, ApiResponse, ApiForbiddenResponse, ApiCreatedResponse, ApiSecurity } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'User has been registered'})
  @ApiResponse({ status: 500, description: 'Internal Server Error'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  @ApiSecurity('')
  @UsePipes(ValidationPipe)
  register(@Body(ValidationPipe) credentials: RegistrationDTO) {
    return this.authService.register(credentials);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  login(@Body(ValidationPipe) credentials: LoginDTO) {
    return this.authService.login(credentials);
  }
}
