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

  @Prop()
  calorBySet:number
}

@Schema()
class Schedule {
  @Prop()
  title: string;
  
  @Prop()
  day: string;

  @Prop([ExerciseDetail])
  exercises: ExerciseDetail[];
}

@Schema()
export class WorkoutPlan extends BaseSchema {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'Trainer' })
  trainerId: Types.ObjectId;

  @Prop({ type: String, enum: Difficulty })
  difficulty: Difficulty;

  @Prop()
  daysPerWeek: number;

  @Prop([Schedule])
  weeklySchedule: Schedule[];

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  userIds: Types.ObjectId[];

  @Prop([{ type: Types.ObjectId, ref: 'Category' }])
  category: Types.ObjectId;

  @Prop()
  location: string;

  @Prop()
  description:string
}

export const WorkoutPlanSchema = SchemaFactory.createForClass(WorkoutPlan);
