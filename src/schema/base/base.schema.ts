import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export abstract class BaseSchema extends Document {
  @Prop({ type: Types.ObjectId, auto: true })
  public id: Types.ObjectId;

  @Prop({ default: null })
  public deletedAt: Date;
}
