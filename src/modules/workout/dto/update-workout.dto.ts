import { BMI } from '@/schema/enums/bmi.enum';
import { Difficulty } from '@/schema/enums/difficulty.enum';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsEnum, IsNumber, IsBoolean } from 'class-validator';

export class UpdateWorkoutDto {
  @ApiProperty({ example: 'Updated Title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'https://example.com/new-image.png', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ enum: Difficulty, example: Difficulty.HARD, required: false })
  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @ApiProperty({ example: 4, required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  daysPerWeek?: number;

  @ApiProperty({ example: '6740ab0639b531298a76e84d', required: false })
  @IsOptional()
  @IsString()
  goal?: string;

  @ApiProperty({ enum: BMI, example: BMI.TooSkinny, required: false })
  @IsOptional()
  @IsEnum(BMI)
  bmi?: BMI;

  @ApiProperty({ example: 'Updated description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsNumber()
  cycle?: number;

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  totalDayOfPlan?: number;
}
