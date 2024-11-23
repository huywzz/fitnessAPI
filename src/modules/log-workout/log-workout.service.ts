import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLogWorkoutDto } from './dto/create-log-workout.dto';
import { UpdateLogWorkoutDto } from './dto/update-log-workout.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WorkoutLog } from '@/schema/workout-log.schema';
import { Model, Types } from 'mongoose';
import { WorkoutService } from '../workout/workout.service';
import { convertObjectId } from '@/shared/utils/converToObjId';
import { GetAllDayDTO } from './dto/get-all-day.dto';
import { DayDetailDTO } from './dto/day-detail.dto';
import { ExerciseLogDTO } from './dto/exercise-log.dto';
import * as path from 'path';

@Injectable()
export class LogWorkoutService {
  constructor(
    @InjectModel(WorkoutLog.name) private logModel: Model<WorkoutLog>,
    @Inject(forwardRef(() => WorkoutService))
    private workoutService: WorkoutService,
  ) {}
  async create(userId: string, planId: string) {
    const newUserId = convertObjectId(userId);
    const newPlanId = convertObjectId(planId);
    const foundPlan = await this.workoutService.findOne(planId);
    if (!foundPlan) {
      throw new BadRequestException('Not found plan');
    }
    const { weeklySchedule, totalDayOfPlan, daysPerWeek } = foundPlan;
    let days = [];
    let temp = 1;
    for (let index = 0; index < totalDayOfPlan; index++) {
      const listEx = weeklySchedule[temp - 1].exercises.map((obj) => {
        const objTemp = {
          ...obj,
          isComplete: false,
        };
        return objTemp;
      });
      days.push({
        dayNumber: index + 1,
        dayTitle: weeklySchedule[temp - 1].title,
        exercises: listEx,
      });
      if (temp === daysPerWeek) {
        temp = 1;
      } else {
        temp++;
      }
    }
    const workoutPlan = new this.logModel({
      userId: newUserId,
      planId: newPlanId,
      days: days,
    });
    return await workoutPlan.save();
  }

  findAll() {
    return `This action returns all logWorkout`;
  }

  async findOne(dto: GetAllDayDTO, user: Types.ObjectId) {
    const planId = convertObjectId(dto.planId);
    return await this.logModel.find({
      planId: planId,
      userId: user,
    });
  }

  async getOne(planId: any, userId: any) {
    return await this.logModel.findOne({
      planId: planId,
      userId: userId,
    });
  }

  update(id: number, updateLogWorkoutDto: UpdateLogWorkoutDto) {
    return `This action updates a #${id} logWorkout`;
  }

  remove(id: number) {
    return `This action removes a #${id} logWorkout`;
  }

  async dayDetail(dto: DayDetailDTO, user: Types.ObjectId) {
    const planId = convertObjectId(dto.planId);
    const result = await this.logModel
      .findOne({
        planId: planId,
        userId: user,
      })
      .populate('days.exercises.exerciseId', 'gifUrl steps name')
      .exec();

    if (!result) {
      throw new NotFoundException('Log workout not found');
    }

    const day = result.days.find((day) => day.dayNumber === +dto.numberDay);

    if (!day) {
      throw new NotFoundException('Day not found');
    }

    return {
      id: result._id,
      day,
    };
  }

  async updateExerciseComplete(
    workoutLogId: string,
    dayNumber: number,
    exerciseIndex: number,
  ): Promise<WorkoutLog> {
    // Tìm WorkoutLog theo ID
    const id = convertObjectId(workoutLogId);
    const workoutLog = await this.logModel.findById(id).exec();

    if (!workoutLog) {
      throw new Error('WorkoutLog not found');
    }

    // Tìm DayLog theo dayNumber
    const dayLog = workoutLog.days.find((day) => day.dayNumber === dayNumber);
    if (!dayLog) {
      throw new Error('DayLog not found');
    }

    // Tìm ExerciseLog theo index trong mảng exercises
    const exerciseLog = dayLog.exercises[exerciseIndex];
    if (!exerciseLog) {
      throw new Error('ExerciseLog not found');
    }

    // Cập nhật trường isComplete thành true
    exerciseLog.isComplete = true;

    // Lưu lại WorkoutLog với thay đổi
    await workoutLog.save();

    return workoutLog;
  }

  async getLogWorkout(userId: Types.ObjectId) {
    return await this.logModel
      .find({
        userId: userId,
      })
      .populate('planId', 'title difficulty description image')
      .select({
        days: false,
        _id: false,
        // userId:true
      });
  }
}
