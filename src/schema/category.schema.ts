import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base/base.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Category extends BaseSchema {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop()
  image: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
