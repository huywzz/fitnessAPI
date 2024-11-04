import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutPlanDto } from './dto/create-workout.dto';
import { WorkoutRepository } from './workout.repository';
import { Types } from 'mongoose';

@Injectable()
export class WorkoutService {
  constructor(private readonly workoutRepository: WorkoutRepository) {}
  async create(createWorkoutDto: CreateWorkoutPlanDto) {
    return await this.workoutRepository.createWorkoutPlan(createWorkoutDto);
  }

  async getWorkoutPlanById(id: string) {
    const workoutPlanId = new Types.ObjectId(id);
    const workoutPlan = await this.workoutRepository.findByIdWithDetails(workoutPlanId);

    if (!workoutPlan) {
      throw new NotFoundException('Workout Plan not found');
    }

    return workoutPlan;
  }

  findAll() {
    return `This action returns all workout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workout`;
  }

  remove(id: number) {
    return `This action removes a #${id} workout`;
  }
}
