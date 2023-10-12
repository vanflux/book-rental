import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, genSalt, hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import { Constants } from '../constants';
import { User } from '../models/user.model';
import {
  AuthDto,
  LoginDto,
  LoginResultDto,
  RegisterDto,
  RegisterResultDto,
} from './auth.dto';

@Injectable()
export class AuthService {
  private jwtSecret: string;

  constructor(
    @Inject(Constants.REPOSITORY.USER)
    private userRepository: typeof User,
    private configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.getOrThrow('jwtSecret');
  }

  async login(loginDto: LoginDto): Promise<LoginResultDto> {
    const existingUser = await this.userRepository.findOne({
      attributes: ['id', 'password'],
      where: {
        email: loginDto.email,
      },
    });
    if (!existingUser) throw new UnauthorizedException();
    const correct = await compare(loginDto.password, existingUser.password);
    if (!correct) throw new UnauthorizedException();
    const authDto: AuthDto = { userId: existingUser.id };
    const accessToken = this.createAccessToken(authDto);
    return { accessToken };
  }

  async register(registerDto: RegisterDto): Promise<RegisterResultDto> {
    const existingUser = await this.userRepository.findOne({
      attributes: ['email'],
      where: {
        email: registerDto.email,
      },
    });
    if (existingUser) throw new ConflictException();
    const salt = await genSalt();
    const password = await hash(registerDto.password, salt);
    const createdUser = await this.userRepository.create({
      id: randomUUID(),
      email: registerDto.email,
      password,
    });
    const authDto: AuthDto = { userId: createdUser.id };
    const accessToken = this.createAccessToken(authDto);
    return { accessToken };
  }

  decodeToken(accessToken: string) {
    try {
      return verify(accessToken, this.jwtSecret) as AuthDto;
    } catch {}
  }

  private createAccessToken(authDto: AuthDto) {
    return sign(authDto, this.jwtSecret);
  }
}
