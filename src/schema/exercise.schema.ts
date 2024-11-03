import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from './base/base.schema';

export type ExerciseDocument = HydratedDocument<Exercise>;
@Schema()
export class Exercise extends BaseSchema {
  @Prop()
  name: string;
  
  @Prop()
  gifUrl: string;

  @Prop([String])
  steps: string[];

  @Prop({ type: Types.ObjectId, ref: 'Category' }) // Thêm category tham chiếu đến Category schema
  category: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Trainer' })
  createdBy: Types.ObjectId;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
