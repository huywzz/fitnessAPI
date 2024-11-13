import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from './base/base.schema';

export type WorkoutLogDocument = HydratedDocument<WorkoutLog>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
class ExerciseLog {
  @Prop({ type: Types.ObjectId, ref: 'Exercise', required: true })
  exerciseId: Types.ObjectId;

  @Prop()
  sets: number;

  @Prop()
  reps: number;

  @Prop({ default: false })
  isComplete: boolean;
}

@Schema()
class DayLog {
  @Prop()
  dayNumber: number;

  @Prop()
  dayTitle: string;

  @Prop({ default: false })
  isComplete: boolean;

  @Prop([ExerciseLog])
  exercises: ExerciseLog[];
}

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class WorkoutLog extends BaseSchema {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'WorkoutPlan', required: true })
  planId: Types.ObjectId;

  @Prop([DayLog])
  days: DayLog[];
}

export const WorkoutLogSchema = SchemaFactory.createForClass(WorkoutLog);
