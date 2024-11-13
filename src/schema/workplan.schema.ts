import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from './base/base.schema';
import { Difficulty } from './enums/difficulty.enum';

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
  title: string;

  @Prop()
  day: number;

  @Prop([ExerciseDetail])
  exercises: ExerciseDetail[];
}

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class WorkoutPlan extends BaseSchema {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: String, enum: Difficulty })
  difficulty: Difficulty;

  @Prop()
  daysPerWeek: number;

  @Prop([Schedule])
  weeklySchedule: Schedule[];

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  userIds: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Goal' })
  goal: Types.ObjectId;

  @Prop()
  bmi: number;

  @Prop()
  description: string;

  @Prop({ default: false })
  isUser: boolean;

  @Prop({ type: Number })
  cycle: number;

  @Prop({ type: Number })
  totalDayOfPlan:number
}

export const WorkoutPlanSchema = SchemaFactory.createForClass(WorkoutPlan);
