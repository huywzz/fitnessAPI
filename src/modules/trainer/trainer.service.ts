import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { TrainerRepository } from './trainer.repository';

@Injectable()
export class TrainerService {
  constructor(private readonly trainerRepository: TrainerRepository) {}
  async create(email: string, password: string) {
    const foundUser = await this.findOneByEmail(email);
    if (foundUser) {
      throw new BadRequestException('Email is exist');
    }
    return await this.trainerRepository.createByEmail(email, password);
  }

  findAll() {
    return `This action returns all trainer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainer`;
  }

  update(id: number, updateTrainerDto: UpdateTrainerDto) {
    return `This action updates a #${id} trainer`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainer`;
  }

  async findOneByEmail(email) {
    const foundUser = await this.trainerRepository.findOneUser({
      email: email,
    });
    return foundUser;
  }

  async findOneByIdOrThrow(id) {
    const trainer= await this.trainerRepository.findOneUser({
      _id:id
    })
    if (!trainer) {
      throw new ForbiddenException()
    }
    return trainer
  }

  async findOneByEmailOrThrow(email) {
    const foundUser = await this.trainerRepository.findOneUser({
      email: email,
    });

    if (!foundUser) {
      throw new BadRequestException('Wrong login')
    }
    return foundUser;
  }

  
}
