import { BaseSchema } from './base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';


export type GoalDocument = HydratedDocument<Goal>;

@Schema()
export class Goal extends BaseSchema {
  @Prop({ required: true })
  title: string;

  @Prop()
  image: string;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
