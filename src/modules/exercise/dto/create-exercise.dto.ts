import { IsNotEmpty, IsString, IsArray, IsOptional, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  gifUrl?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsString()
  steps: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  createdBy: string;
}
