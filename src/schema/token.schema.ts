import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from './base/base.schema';

export type TokenDocument = HydratedDocument<Token>;
export class Token extends BaseSchema {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  token: string;

  @Prop()
  refreshToken: string;

  @Prop()
  deviceInfo: string;

  @Prop({ default: false })
  isRevoked: boolean;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
