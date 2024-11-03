import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Length } from 'class-validator';

export class LoginEmailDto {
  @IsNotEmpty()
  @IsEmail()
  @Length(5, 255)
  @ApiProperty({
    description: 'email of user',
    example: 'abc@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @Length(8, 32)
  @IsStrongPassword()
  @ApiProperty({
    description: 'password of user',
    example: '123456@Abc',
  })
  password: string;
}
