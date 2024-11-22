import { IsString, IsEnum, IsBoolean, IsOptional, IsMongoId, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { Difficulty } from '@/schema/enums/difficulty.enum';
import { BMI } from '@/schema/enums/bmi.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { convertObjectId } from '@/shared/utils/converToObjId';

export class CreatePlanDto {
  @ApiProperty({
    description: 'Title',
    example: 'Workout daily',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? 'Default Title')
  title: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? process.env.DEFAULT_THUMB_PLAN)
  image: string;

  @ApiProperty({
    description: 'Difficulty',
    example: Difficulty.BEGINNER,
    required: false,
  })
  @IsOptional()
  @IsEnum(Difficulty)
  @Transform(({ value }) => value ?? Difficulty.NONE)
  difficulty: Difficulty;

  @ApiProperty({
    description: 'Desciption of plan',
    example: 'Desciption of plan',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? 'Default description for the workout plan.')
  description: string;

  @ApiProperty({
    description: 'Số ngày tập trong một tuần',
    example: 3,
  })
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => +value)
  daysPerWeek: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value ?? false)
  isUser: boolean;

  @ApiProperty({
    description: 'BMI for plan',
    example: BMI.TooFat,
    required: false,
  })
  @IsOptional()
  @IsEnum(BMI)
  @Transform(({ value }) => value ?? BMI.TooSkinny)
  bmi: BMI;

  @ApiProperty({
    description: 'Id of goal plan',
    example: '64c8b2d1e83d8a10fcd4e20c',
    required: false,
  })
  @IsOptional()
  // @Transform(({ value }) => convertObjectId(value))
  goal?: any;

  @IsOptional()
  userId?: string;

  @ApiProperty({
    description: 'Số ngày tập trong một tuần',
    example: 3,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  totalDayOfPlan: number;
}
