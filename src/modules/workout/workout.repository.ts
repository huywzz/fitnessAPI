import { WorkoutPlan } from '@/schema/workplan.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateWorkoutPlanDto } from './dto/create-workout.dto';

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
      })
      .exec();
  }

  async findAll(): Promise<WorkoutPlan[]> {
    return this.workOutModel.find().exec();
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
}
