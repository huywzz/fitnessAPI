import { WorkoutPlan } from '@/schema/workplan.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateWorkoutPlanDto } from './dto/create-workout.dto';
import { Difficulty } from '@/schema/enums/difficulty.enum';
import { BMI } from '@/schema/enums/bmi.enum';
import { CreatePlanDto } from './dto/create-plan.dto';

export class WorkoutRepository {
  constructor(@InjectModel(WorkoutPlan.name) private workOutModel: Model<WorkoutPlan>) {}

  async createWorkoutPlan(createWorkoutPlanDto: CreateWorkoutPlanDto): Promise<WorkoutPlan> {
    const workoutPlan = new this.workOutModel(createWorkoutPlanDto);
    return workoutPlan.save();
  }

  async findById(id: Types.ObjectId): Promise<WorkoutPlan | null> {
    return this.workOutModel
      .findById(id)
      .populate({
        path: 'weeklySchedule.exercises.exerciseId',
        model: 'Exercise',
        select: 'name gifUrl',
      })
      .exec();
  }

  async findAll(): Promise<WorkoutPlan[]> {
    return this.workOutModel
      .find()
      .select({
        title: true,
        image: true,
        difficulty: true,
      })
      .sort({
        created_at: 1,
      })
      .limit(5)
      .exec();
  }

  async findByIdWithDetails(id: Types.ObjectId): Promise<WorkoutPlan> {
    return this.workOutModel
      .findById(id) // Start the query here, but don't await yet
      .populate('trainerId', 'name specialties') // Populate trainer details
      .populate({
        path: 'weeklySchedule.exercises.exerciseId',
        select: 'name type equipment gifUrl', // Populate exercise details
      })
      .populate('category', 'name description') // Populate category details
      .exec(); // Execute the query with exec()
  }

  async findByGoal(goal: string) {
    const id = new Types.ObjectId(goal);
    return this.workOutModel
      .find({
        goal: id,
      })
      .select({
        difficulty: true,
        image: true,
        title: true,
        description: true,
      });
  }

  async findByQuery(obj: {}) {
    return await this.workOutModel
      .find(obj)
      .select({
        title: true,
        image: true,
        difficulty: true,
      })
      .exec();
  }

  async create(dto: CreatePlanDto) {
    const workoutPlan = new this.workOutModel(dto);
    return workoutPlan.save();
  }
  async updatePlan(filter: {}, update: {}, option: {}) {
    return await this.workOutModel.findOneAndUpdate(filter, update, option);
  }

  async findAllPaginated(query: any, limit: number, offset: number): Promise<WorkoutPlan[]> {
    return this.workOutModel
      .find(query) // Truyền query để tìm theo điều kiện
      .populate('goal')
      .select(['-weeklySchedule', '-userIds'])
      .skip(offset)
      .limit(limit)
      .exec();
  }

  async countDocuments(query: FilterQuery<WorkoutPlan>): Promise<number> {
    return this.workOutModel.countDocuments(query);
  }
}
