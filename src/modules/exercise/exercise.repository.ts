import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  // Lấy tất cả bài tập
  async findAll(): Promise<Exercise[]> {
    return this.exerciseModel.find().populate('category').populate('createdBy').exec();
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

  // Tìm tất cả bài tập theo ID danh mục (categoryId)
  async findByCategory(categoryId: string): Promise<Exercise[]> {
    const category = new Types.ObjectId(categoryId);
    return this.exerciseModel
      .find({
        category: category,
      })
      .populate('category')
      .exec();
  }

  async updateExercise(filter: {}, update: {}, option: {}) {
    return await this.exerciseModel.findOneAndUpdate(filter, update, option);
  }
}
