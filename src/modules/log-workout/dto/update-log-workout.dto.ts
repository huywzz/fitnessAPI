import { PartialType } from '@nestjs/swagger';
import { CreateLogWorkoutDto } from './create-log-workout.dto';

export class UpdateLogWorkoutDto extends PartialType(CreateLogWorkoutDto) {}
