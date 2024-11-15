import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from './base/base.schema';

export type ExerciseDocument = HydratedDocument<Exercise>;
@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Exercise extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  gifUrl: string;

  @Prop()
  thumbnail:string

  @Prop({ maxlength: 500 })
  steps: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' }) // Thêm category tham chiếu đến Category schema
  category: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ default: true })
  isPublic: boolean;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
