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
    type: [
      {
        plan_id: { type: Types.ObjectId, ref: 'WorkoutPlan' },
        start_date: Date,
        end_date: Date,
      },
    ],
    default: [],
  })
  selectedPlans: Array<{
    plan_id: { type: Types.ObjectId; ref: 'WorkoutPlan' };
    start_date: Date;
    end_date: Date;
  }>;

  @Prop([{ type: Types.ObjectId, ref: 'WorkoutPlan' }])
  customPlanIds: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
