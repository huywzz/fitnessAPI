import { IsArray, IsInt, IsMongoId, IsNotEmpty, IsString, Min, Max, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ExerciseDetailDto {
  @ApiProperty({
    description: 'ID của bài tập',
    example: '648a7f2b8f1b3c42acdeabcd',
  })
  @IsMongoId()
  @IsNotEmpty()
  exerciseId: string; // ID của bài tập

  @ApiProperty({
    description: 'Số lần lặp lại (Reps)',
    example: 12,
    minimum: 1,
    maximum: 50,
  })
  @IsInt()
  @Min(1)
  @Max(50)
  reps: number; // Số lần lặp lại (Reps)

  @ApiProperty({
    description: 'Số set',
    example: 4,
    minimum: 1,
    maximum: 10,
  })
  @IsInt()
  @Min(1)
  @Max(10)
  sets: number; // Số set
}

class ScheduleDto {
  @ApiProperty({
    description: 'Tiêu đề của ngày tập',
    example: 'Leg Day',
  })
  @IsString()
  @IsNotEmpty()
  title: string; // Tiêu đề của ngày tập

  @ApiProperty({
    description: 'Ngày trong tuần (1-7)',
    example: 1,
    minimum: 1,
    maximum: 7,
  })
  @IsInt()
  @Min(1)
  @Max(7)
  day: number; // Ngày trong tuần (1-7)

  @ApiProperty({
    description: 'Danh sách bài tập trong ngày',
    type: [ExerciseDetailDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseDetailDto)
  exercises: ExerciseDetailDto[]; // Danh sách bài tập trong ngày
}

export class AddEXDto {
  @ApiProperty({
    description: 'Danh sách lịch tập luyện',
    type: [ScheduleDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  schedules: ScheduleDto[]; // Danh sách lịch tập luyện
}
