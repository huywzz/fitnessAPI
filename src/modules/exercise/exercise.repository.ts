import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from '@/schema/exercise.schema';

@Injectable()
export class ExerciseRepository {
  constructor(@InjectModel(Exercise.name) private exerciseModel: Model<Exercise>) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const createdExercise = new this.exerciseModel({
      ...createExerciseDto,
      category: new Types.ObjectId(createExerciseDto.category),
      createdBy: new Types.ObjectId(createExerciseDto.createdBy),
    });
    return await createdExercise.save();
  }

  // Tìm bài tập theo ID
  async findById(id: string): Promise<Exercise> {
    const _id = new Types.ObjectId(id);
    return this.exerciseModel
      .findById({
        _id: _id,
      })
      .populate('category')
      .populate('createdBy')
      .exec();
  }

  // Xóa bài tập
  async delete(id: string): Promise<Exercise> {
    return this.exerciseModel.findByIdAndDelete(id).exec();
  }

  async findAllPaginated(query: any, limit: number, offset: number): Promise<Exercise[]> {
    return this.exerciseModel
      .find(query) // Truyền query để tìm theo điều kiện
      .populate('category')
      .populate('createdBy')
      .skip(offset)
      .limit(limit)
      .exec();
  }
  // Lấy tổng số bản ghi
  async countDocuments(query: FilterQuery<Exercise>): Promise<number> {
    return this.exerciseModel.countDocuments(query);
  }

  async updateExercise(filter: {}, update: {}, option: {}) {
    return await this.exerciseModel.findOneAndUpdate(filter, update, option);
  }
}
