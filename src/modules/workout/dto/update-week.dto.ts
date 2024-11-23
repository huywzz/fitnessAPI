import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class ExerciseDetailDto {
  @ApiProperty({ example: '6736cde983c0784d8d84ffac' })
  @IsNotEmpty()
  @IsString()
  exerciseId: Types.ObjectId;

  @ApiProperty({ example: 8, required: false })
  @IsOptional()
  @IsNumber()
  reps?: number;

  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  @IsNumber()
  sets?: number;
}

export class ScheduleDto {
  @ApiProperty({ example: 'Day 1 - Workout' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  day: number;

  @ApiProperty({ type: [ExerciseDetailDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseDetailDto)
  exercises: ExerciseDetailDto[];
}

export class UpdateWeeklyScheduleDto {
  @ApiProperty({ type: [ScheduleDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  weeklySchedule: ScheduleDto[];
}
