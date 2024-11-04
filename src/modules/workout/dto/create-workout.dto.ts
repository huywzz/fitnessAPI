import { Difficulty } from '@/schema/enums/difficulty.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNumber,
  IsString,
  IsEnum,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Types } from 'mongoose';


class CreateExerciseDetailDto {
  @ApiProperty({
    example: '6727b08fbd1dc47908d17eef',
    description: 'ID của bài tập',
  })
  @IsMongoId()
  exerciseId: Types.ObjectId;

  @ApiProperty({
    example: 15,
    description: 'Số lần thực hiện mỗi set',
  })
  @IsNumber()
  reps: number;

  @ApiProperty({
    example: 4,
    description: 'Số set thực hiện',
  })
  @IsNumber()
  sets: number;

  @ApiProperty({
    example: 50,
    description: 'Lượng calo đốt cháy mỗi set',
  })
  @IsNumber()
  calorBySet: number;
}

class CreateScheduleDto {
  @ApiProperty({
    example: 'Full Body Workout',
    description: 'Tiêu đề của lịch trình ngày hôm đó',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Monday',
    description: 'Ngày trong tuần của lịch tập luyện',
  })
  @IsString()
  day: string;

  @ApiProperty({
    example: [
      {
        exerciseId: '6727b08fbd1dc47908d17eef',
        reps: 15,
        sets: 4,
        calorBySet: 50,
      },
    ],
    description: 'Danh sách các bài tập chi tiết trong ngày',
    type: [CreateExerciseDetailDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseDetailDto)
  exercises: CreateExerciseDetailDto[];
}

export class CreateWorkoutPlanDto {
  @ApiProperty({
    example: 'Muscle Building Plan',
    description: 'Tiêu đề của kế hoạch tập luyện',
  })
  @IsString()
  title: string;

  @IsMongoId()
  @IsOptional()
  trainerId: Types.ObjectId;

  @ApiProperty({
    example: Difficulty.HARD,
    description: 'Mức độ khó của kế hoạch',
    enum: Difficulty,
  })
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiProperty({
    example: 5,
    description: 'Số ngày tập luyện mỗi tuần',
  })
  @IsNumber()
  daysPerWeek: number;

  @ApiProperty({
    example: [
      {
        title: 'Full Body Workout',
        day: 'Monday',
        exercises: [
          {
            exerciseId: '6727b08fbd1dc47908d17eef',
            reps: 15,
            sets: 4,
            calorBySet: 50,
          },
          {
            exerciseId: '6727b156c8eadffbebb3bb15',
            reps: 15,
            sets: 6,
            calorBySet: 50,
          },
        ],
      },
      {
        title: 'Boxing',
        day: 'Tuesday',
        exercises: [
          {
            exerciseId: '6727b08fbd1dc47908d17eef',
            reps: 15,
            sets: 2,
            calorBySet: 50,
          },
          {
            exerciseId: '6727b17cc8eadffbebb3bb18',
            reps: 15,
            sets: 1,
            calorBySet: 50,
          },
        ],
      },
    ],
    description: 'Lịch trình tập luyện hàng tuần',
    type: [CreateScheduleDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateScheduleDto)
  weeklySchedule: CreateScheduleDto[];

  @ApiProperty({
    example: '6727a729324b4fe5e64c91b4',
    description: 'ID của danh mục kế hoạch tập luyện',
  })
  @IsMongoId()
  category: Types.ObjectId;

  @ApiProperty({
    example: 'Fitness Center Downtown',
    description: 'Địa điểm tập luyện',
  })
  @IsString()
  location: string;

  @ApiProperty({
    example: 'Chương trình tập luyện giúp bạn đạt được mục tiêu xây dựng cơ bắp hiệu quả.',
    description: 'Mô tả ngắn gọn về kế hoạch tập luyện',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
