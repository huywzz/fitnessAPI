import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from './base/base.schema';
import { Difficulty } from './enums/difficulty.enum';
import { BMI } from './enums/bmi.enum';

export type WorkoutPlanDocument = HydratedDocument<WorkoutPlan>;
@Schema()
class ExerciseDetail {
  @Prop({ type: Types.ObjectId, ref: 'Exercise', default: null })
  exerciseId: Types.ObjectId;

  @Prop({ default: null })
  reps: number;

  @Prop({ default: null })
  sets: number;
}

@Schema()
class Schedule {
  @Prop({ default: null })
  title: string;

  @Prop({ default: null })
  day: number;

  @Prop({ default: [] })
  exercises: ExerciseDetail[];
}

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class WorkoutPlan extends BaseSchema {
  @Prop({ default: 'Default Title' })
  title: string;

  @Prop({ default: `${process.env.DEFAULT_THUMB_PLAN}` })
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  userId: Types.ObjectId;

  @Prop({ type: String, enum: Difficulty, default: Difficulty.NONE })
  difficulty: Difficulty;

  @Prop({ default: 3 }) // Số ngày mặc định trong tuần
  daysPerWeek: number;

  @Prop({ type: [Schedule], default: [] }) // Lịch tập trống mặc định
  weeklySchedule: Schedule[];

  @Prop([{ type: Types.ObjectId, ref: 'User', default: [] }])
  userIds: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Goal', default: null })
  goal: Types.ObjectId;

  @Prop({ type: String, enum: BMI, default: BMI.TooFat }) // BMI mặc định là 0
  bmi: BMI;

  @Prop({ default: 'No description provided' })
  description: string;

  @Prop({ default: false })
  isUser: boolean;

  @Prop({ default: 1 }) // Số chu kỳ mặc định là 1
  cycle: number;

  @Prop({ default: 30 }) // Tổng số ngày mặc định của kế hoạch là 30
  totalDayOfPlan: number;
}

export const WorkoutPlanSchema = SchemaFactory.createForClass(WorkoutPlan);
