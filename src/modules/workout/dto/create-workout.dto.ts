import { BMI } from '@/schema/enums/bmi.enum';
import { Difficulty } from '@/schema/enums/difficulty.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Types } from 'mongoose';

// DTO cho ExerciseDetail
export class ExerciseDetailDto {
  @IsMongoId()
  @IsNotEmpty()
  exerciseId: Types.ObjectId;

  @IsNumber()
  @Min(1)
  reps: number;

  @IsNumber()
  @Min(1)
  sets: number;
}

// DTO cho Schedule
export class ScheduleDto {
  @ApiProperty({
    description: 'Tên ngày tập',
    example: 'Biceps+Core',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiProperty({
    description: 'Ngày tập thứ mấy',
    example: '1',
  })
  @IsNumber()
  @Min(1)
  day: number;

  @ApiProperty({
    description: 'Danh sách bài tập cho ngày tập luyện',
    type: [ExerciseDetailDto],
    example: [
      {
        exerciseId: '673341d2af810e16b2cfd502',
        reps: 12,
        sets: 3,
      },
      {
        exerciseId: '673342c8af810e16b2cfd506',
        reps: 10,
        sets: 4,
      },
      {
        exerciseId: '673342feaf810e16b2cfd50e',
        reps: 10,
        sets: 4,
      },
    ],
  })
  @IsArray()
  exercises: ExerciseDetailDto[];
}

// DTO cho CreateWorkoutPlan
export class CreateWorkoutPlanDto {
  @ApiProperty({
    description: 'Tên của kế hoạch tập luyện',
    example: 'Beginner Full Body Workout',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  userId?: string;

  @ApiProperty({
    description: 'Độ khó của kế hoạch tập luyện',
    enum: Difficulty,
    example: Difficulty.BEGINNER,
  })
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiProperty({
    description: 'Số ngày tập trong một tuần',
    example: 3,
  })
  @IsNumber()
  @Min(1)
  daysPerWeek: number;

  @ApiProperty({
    description: 'Lịch tập trong tuần',
    type: [ScheduleDto],
  })
  @IsArray()
  weeklySchedule: ScheduleDto[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  userIds?: Types.ObjectId[];

  @ApiProperty({
    description: 'ID của mục tiêu kế hoạch tập luyện',
    example: '64c8b2d1e83d8a10fcd4e20c',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  goal?: Types.ObjectId;

  @ApiProperty({
    description: 'BMI là bao nhiêu để được rcm plan này',
    example: BMI.TooSkinny,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsEnum(BMI)
  bmi?: BMI;

  @ApiProperty({
    description: 'Mô tả về kế hoạch tập luyện',
    example: 'A comprehensive workout plan for beginners.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  isUser: boolean;

  @IsOptional()
  @IsNumber()
  totalDayOfPlan: number;
}
