import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from './base/base.schema';

export type WorkoutPlanDocument = HydratedDocument<WorkoutPlan>;
@Schema()
class ExerciseDetail {
  @Prop({ type: Types.ObjectId, ref: 'Exercise' })
  exerciseId: Types.ObjectId;

  @Prop()
  reps: number;

  @Prop()
  sets: number;
}

@Schema()
class Schedule {
  @Prop()
  day: string;

  @Prop([ExerciseDetail])
  exercises: ExerciseDetail[];
}

@Schema()
export class WorkoutPlan extends BaseSchema {
  @Prop()
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Trainer' })
  trainerId: Types.ObjectId;

  @Prop()
  difficulty: string;

  @Prop()
  daysPerWeek: number;

  @Prop([Schedule])
  weeklySchedule: Schedule[];

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  userIds: Types.ObjectId[];

  @Prop()
  location: string;
}

export const WorkoutPlanSchema = SchemaFactory.createForClass(WorkoutPlan);
