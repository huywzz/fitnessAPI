
import { Trainer } from '@/schema/trainer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class TrainerRepository {
  constructor(@InjectModel(Trainer.name) private trainerModel: Model<Trainer>) {}

  async createByEmail(email: string, password: string) {
    const newUser = new this.trainerModel({
      email: email,
      password,
    });
    return await newUser.save();
  }

  async createBySocial(email: string, fullName: string) {
    const newUser = new this.trainerModel({
      email: email,
      fullName: fullName,
    });
    return await newUser.save();
  }

  async findOneUser(conditions: {}) {
    return await this.trainerModel.findOne(conditions);
  }
  
}
