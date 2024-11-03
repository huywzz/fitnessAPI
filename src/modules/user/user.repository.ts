import { User } from '@/schema/user.schema';
import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
    return await this.userModel.findOne(conditions);
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
}
