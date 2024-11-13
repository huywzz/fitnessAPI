import { IsNotEmpty } from 'class-validator';

export class ExerciseLogDTO {
  @IsNotEmpty()
  planId: string;

  @IsNotEmpty()
  numberDay: number;

  @IsNotEmpty()
  exerciseId: string;
}
