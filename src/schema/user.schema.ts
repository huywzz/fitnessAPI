import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from './base/base.schema';

export type UserDocument = HydratedDocument<User>;
@Schema()
class Profile {
  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  weight: number;

  @Prop()
  height: number;

  @Prop({ type: Types.ObjectId, ref: 'Trainer' })
  preferredTrainerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Goal' })
  goal: Types.ObjectId;
}

@Schema()
class Progress {
  @Prop()
  currentWeight: number;

  @Prop()
  goalWeight: number;
}

@Schema()
export class User extends BaseSchema {
  @Prop()
  fullName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: Profile })
  profile: Profile;

  @Prop([{ type: Types.ObjectId, ref: 'WorkoutPlan' }])
  workoutPlans: Types.ObjectId[];

  @Prop({ type: Array, default: [] })
  completedWorkouts: any[];

  @Prop({ type: Progress })
  progress: Progress;
}

export const UserSchema = SchemaFactory.createForClass(User);
