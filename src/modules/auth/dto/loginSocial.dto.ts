import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginSocialDto {
  @ApiProperty({
    name: 'idToken',
    type: String,
    description: 'Token',
  })
  @IsNotEmpty()
  @IsString()
  idToken: string;

  @ApiProperty({
    name: 'email',
    type: String,
    description: 'abc@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
