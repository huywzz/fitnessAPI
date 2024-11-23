import { User } from '@/schema/user.schema';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createByEmail(email: string, password: string) {
    const newUser = new this.userModel({
      email: email,
      password,
    });
    return await newUser.save();
  }

  async createBySocial(email: string, fullName: string) {
    const newUser = new this.userModel({
      email: email,
      fullName: fullName,
    });
    return await newUser.save();
  }

  async findOneUser(conditions: {}) {
    return (await this.userModel.findOne(conditions)).populate({
      path: 'selectedPlans.plan_id',
      model: 'WorkoutPlan',
      select: 'image title difficulty',
    });
  }

  async updateUser(data: {}, userId) {
    const user = await this.userModel.findByIdAndUpdate(userId, {
      $set: data,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateOne(user: User) {
    return await user.save();
  }

  async findAll() {
    return await this.userModel.find();
  }

  async updateManySelectedPlans(userId: Types.ObjectId, update: any, options?: any) {
    return await this.userModel.updateOne(
      { _id: userId },
      { $set: { 'selectedPlans.$[].isUsing': false } },
      options,
    );
  }
}
