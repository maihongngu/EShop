import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDTO, LoginDTO } from 'src/models/user.model';
@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
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
