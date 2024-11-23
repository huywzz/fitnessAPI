import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseSchema } from './base/base.schema';
import { Role } from './enums/role.enum';

export type UserDocument = HydratedDocument<User>;

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

class SelectedPlan {
  @Prop({ type: Types.ObjectId, ref: 'WorkoutPlan' })
  plan_id: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isUsing: boolean;
}

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User extends BaseSchema {
  @Prop()
  fullName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: Profile })
  profile: Profile;

  @Prop({ type: Progress })
  progress: Progress;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;

  @Prop({
    default: [], // Default is an empty array
  })
  selectedPlans: SelectedPlan[]

  @Prop([{ type: Types.ObjectId, ref: 'WorkoutPlan' }])
  customPlanIds: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
