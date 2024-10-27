import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchema } from './base/base.schema';
@Schema()
export class Exercise extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  equipment: string;

  @Prop()
  type: string;

  @Prop()
  reps: number;

  @Prop()
  sets: number;

  @Prop()
  restTime: number;

  @Prop()
  weight: number;

  @Prop()
  gifUrl: string;

  @Prop([String])
  steps: string[];

  @Prop({ type: Types.ObjectId, ref: 'Trainer' })
  createdBy: Types.ObjectId;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
