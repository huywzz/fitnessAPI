import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'typeorm';

export type WorkoutLogDocument = HydratedDocument<WorkoutLog>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class WorkoutLog extends BaseEntity {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  planId: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  numberOfDay: number;
  @Prop({
    type: [
      {
        exerciseId: String,
        setsCompleted: Number,
      },
    ],
    default: [],
  })
  exercises: Array<{
    exerciseId: string;
    setsCompleted: number;
  }>;
}

export const WorkoutLogSchema = SchemaFactory.createForClass(WorkoutLog);
