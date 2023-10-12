import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

// Auth dto

export class AuthDto {
  @ApiProperty()
  public userId?: string;
}

// Login dto

export class LoginDto {
  @ApiProperty({ example: 'test@mail.com' })
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  public password: string;
}

export class LoginResultDto {
  @ApiProperty()
  public accessToken: string;
}

// Register dto

export class RegisterDto extends LoginDto {}

export class RegisterResultDto extends LoginResultDto {}
