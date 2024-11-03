import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { Gender } from '../enum/gender.enum';

export class UpdateUserBMIDto {
  @ApiProperty({
    example: '18',
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    example: 'Famale',
  })
  @IsEnum(Gender)
  gender: Gender; //Male, Famale

  @ApiProperty({
    example: '60',
  })
  @IsNumber()
  weight: number;

  @ApiProperty({
    example: '170',
  })
  @IsNumber()
  height: number;
}
