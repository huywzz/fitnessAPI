import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, IsOptional, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateExerciseDto {
  @ApiProperty({
    example: 'test update title',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  gifUrl?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiProperty({
    example: 'test update steps',
  })
  @IsString()
  steps: string;

  @ApiProperty({
    example: '6727a729324b4fe5e64c91be',
  })
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  createdBy: string;
}
