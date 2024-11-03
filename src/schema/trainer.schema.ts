import { BaseSchema } from './base/base.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TrainerDocument = HydratedDocument<Trainer>;
@Schema()
class Message {
  @Prop()
  sender: string;

  @Prop()
  message: string;

  @Prop()
  sentAt: Date;
}

@Schema()
class ChatHistory {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop([Message])
  messages: Message[];
}

@Schema()
export class Trainer extends BaseSchema {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop([String])
  specialties: string[];

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  clients: Types.ObjectId[];

  @Prop([{ type: Types.ObjectId, ref: 'WorkoutPlan' }])
  workoutPlans: Types.ObjectId[];

  @Prop([ChatHistory])
  chatHistory: ChatHistory[];
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
