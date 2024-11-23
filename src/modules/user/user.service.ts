import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UpdateUserBMIDto } from './dto/update-user-BMI.dto';
import { UpdateGoalDTO } from './dto/update-goal.dto';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(email: string, password: string) {
    const foundUser = await this.findOneByEmail(email);
    if (foundUser) {
      throw new BadRequestException('Email is exist');
    }
    return await this.userRepository.createByEmail(email, password);
  }

  async createBySocial(email: string, name: string) {
    const foundUser = await this.findOneByEmail(email);
    if (foundUser) {
      throw new BadRequestException('Email is exist');
    }
    return await this.userRepository.createBySocial(email, name);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOneOrThrowById(id: any) {
    const foundUser = await this.userRepository.findOneUser({
      _id: id,
    });
    if (!foundUser) {
      throw new BadRequestException('User not found');
    }
    return foundUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneOrThrowByEmail(email: string) {
    const foundUser = await this.userRepository.findOneUser({
      email: email,
    });
    if (!foundUser) {
      throw new BadRequestException('User not found');
    }
    return foundUser;
  }

  async findOneByEmail(email) {
    const foundUser = await this.userRepository.findOneUser({
      email: email,
    });
    return foundUser;
  }

  async updateBMI(dto: UpdateUserBMIDto, id) {
    await this.findOneOrThrowById(id);
    const updateUser = await this.userRepository.updateUser(
      {
        profile: dto,
      },
      id,
    );
    const convertToM = dto.height / 100;
    const bmi = dto.weight / (convertToM * convertToM);

    return {
      updateUser,
      bmi,
    };
  }

  async updateGoal(dto: UpdateGoalDTO, id) {
    const found = await this.findOneOrThrowById(id);
    const obj = new Types.ObjectId(dto.goal);
    found.profile.goal = obj._id;
    return await this.userRepository.updateOne(found);
  }

  async findOneById(id: any) {
    return await this.userRepository.findOneUser({
      _id: id,
    })
  }

  // async updateManySelectedPlans(userId: Types.ObjectId, update: any, options?: any) {
  //   return await this.
  // }
}
