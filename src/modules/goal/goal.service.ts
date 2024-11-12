import { Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Model } from 'mongoose';
import { Goal } from '@/schema/goal.schema';
import { InjectModel } from '@nestjs/mongoose';
import { WorkoutService } from '../workout/workout.service';

@Injectable()
export class GoalService {
  constructor(
    @InjectModel(Goal.name) private goalModel: Model<Goal>,
    private workoutService: WorkoutService,
  ) {}
  create(createGoalDto: CreateGoalDto) {
    return 'This action adds a new goal';
  }

  async findAll() {
    return await this.goalModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} goal`;
  }

  update(id: number, updateGoalDto: UpdateGoalDto) {
    return `This action updates a #${id} goal`;
  }

  remove(id: number) {
    return `This action removes a #${id} goal`;
  }

  async findManyById(id: string) {
    return await this.workoutService.findWorkOutByGoal(id)
  }
}
