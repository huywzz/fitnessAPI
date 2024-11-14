import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class UpdateExerciseCompleteDTO {
  @ApiProperty({
    description: 'ID of the workout log to update',
    example: '6734642d0d1f33a28c22f2f9',
  })
  @IsString()
  workoutLogId: string;

  @ApiProperty({
    description: 'Day number in the workout plan',
    example: 1,
  })
  @IsInt()
  @Min(1)
  dayNumber: number;

  @ApiProperty({
    description: "Index of the exercise in the day's exercise list",
    example: 0,
  })
  @IsInt()
  @Min(0)
  exerciseIndex: number;
}
