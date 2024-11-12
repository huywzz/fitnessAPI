import { BaseSchema } from './base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type GoalDocument = HydratedDocument<Goal>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Goal extends BaseSchema {
  @Prop({ required: true })
  title: string;

  @Prop()
  image: string;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
