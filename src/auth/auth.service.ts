import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { LoginDTO, RegistrationDTO } from 'src/models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegistrationDTO) {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      const payload = { username: user.username };
      const token = this.jwtService.sign(payload);
      return { user: { ...user.toJSON(), token } };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username has already taken');
      }
      throw new InternalServerErrorException();
    }
  }
  async login({ email, password }: LoginDTO) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      const payload = { username: user.username };
      const token = this.jwtService.sign(payload);
      if (user && (await user.comparePassword(password))) {
        return { user: { ...user.toJSON(), token } };
      }
      throw new UnauthorizedException('Invalid Credentials');
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
