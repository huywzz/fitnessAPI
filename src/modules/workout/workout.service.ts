import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkoutPlanDto } from './dto/create-workout.dto';
import { WorkoutRepository } from './workout.repository';
import { Types } from 'mongoose';
import { UserService } from '../user/user.service';
import { Role } from '@/schema/enums/role.enum';
import * as path from 'path';
import * as fs from 'fs';
import { CloudinaryService } from '@/shared/services/cloudinary.service';
import { ExerciseService } from '../exercise/exercise.service';
import { RegisterWorkoutDTO } from './dto/register-workout.dto';
import { LogWorkoutService } from '../log-workout/log-workout.service';
import { Difficulty } from '@/schema/enums/difficulty.enum';
import { CreatePlanDto } from './dto/create-plan.dto';
import { convertObjectId } from '@/shared/utils/converToObjId';
import { AddEXDto } from './dto/add.ex.dto';
import { RecommendPlanDTO } from './dto/rcm-plan.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { UpdateWeeklyScheduleDto } from './dto/update-week.dto';

@Injectable()
export class WorkoutService {
  private readonly videoUploadPath = path.join(process.cwd(), 'src', 'shared', 'store');
  constructor(
    private readonly workoutRepository: WorkoutRepository,
    private cloudService: CloudinaryService,
    private userService: UserService,
    private exService: ExerciseService,
    @Inject(forwardRef(() => LogWorkoutService))
    private logService: LogWorkoutService,
  ) {
    if (!fs.existsSync(this.videoUploadPath)) {
      fs.mkdirSync(this.videoUploadPath, { recursive: true });
    }
  }
  async create(createWorkoutDto: CreateWorkoutPlanDto) {
    const user = await this.userService.findOneById(createWorkoutDto.userId);
    if (user.role === Role.USER) {
      createWorkoutDto.isUser = true;
    }
    createWorkoutDto.weeklySchedule.forEach((schedule) => {
      schedule.exercises.forEach((exercise) => {
        exercise.exerciseId = new Types.ObjectId(exercise.exerciseId);
      });
    });
    createWorkoutDto.goal = new Types.ObjectId(createWorkoutDto.goal);
    const firstEx = createWorkoutDto.weeklySchedule[0].exercises[0].exerciseId.toString();
    const foundEx = await this.exService.findOne(firstEx);
    createWorkoutDto.image = foundEx.thumbnail;
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

  private async paginate(query: any, limit: number, page: number) {
    const totalRecords = await this.workoutRepository.countDocuments(query); // Đếm tổng số bản ghi theo query
    const totalPages = Math.ceil(totalRecords / limit);
    const offset = (page - 1) * limit;
    const data = await this.workoutRepository.findAllPaginated(query, limit, offset); // Truyền query vào repository

    return {
      totalPages,
      currentPage: page,
      limit: limit,
      data,
    };
  }

  async findAll(limit = 10, page = 1) {
    return await this.paginate({}, limit, page);
  }

  async findByGoal(goalId: string, limit = 10, offset = 0) {
    const goal = convertObjectId(goalId);
    return this.paginate({ goal: goal }, limit, offset);
  }

  async findOne(id: string) {
    const newId = new Types.ObjectId(id);
    return await this.workoutRepository.findById(newId);
  }

  remove(id: number) {
    return `This action removes a #${id} workout`;
  }

  async findWorkOutByGoal(goal: string) {
    return await this.workoutRepository.findByGoal(goal);
  }

  async rcmPlan(dto: RecommendPlanDTO) {
    const obj = convertObjectId(dto.goal);
    return await this.workoutRepository.findByQuery({
      bmi: dto.bmi,
      goal: obj,
    });
  }

  async findByQuery(goal?: string, difficulty?: Difficulty) {
    let obj: any = {};

    // Kiểm tra giá trị goal có hợp lệ không
    if (goal && Types.ObjectId.isValid(goal)) {
      const goalId = new Types.ObjectId(goal);
      obj.goal = goalId;
    } else if (goal) {
      console.error('Invalid goal ObjectId:', goal);
      throw new Error('Invalid goal ObjectId format');
    }

    if (difficulty) {
      obj.difficulty = difficulty;
    }

    console.log(obj);
    return await this.workoutRepository.findByQuery(obj);
  }

  async registerPlan(dto: RegisterWorkoutDTO, userId: string) {
    const newUserId = convertObjectId(userId);
    const newPlanId = convertObjectId(dto.planId);
    const foundLog = await this.logService.getOne(newPlanId, newUserId);
    if (foundLog) {
      throw new BadRequestException('Exist log');
    }
    const result = await this.logService.create(userId, dto.planId);

    const foundUser = await this.userService.findOneById(newUserId);
    const foundPlan = await this.findOne(dto.planId);
    if (!foundPlan) {
      throw new BadRequestException('Not found plan');
    }
    foundPlan.userIds.push(newUserId);
    await foundPlan.save();

    if (!foundUser) {
      throw new BadRequestException();
    }

    const { selectedPlans } = foundUser;
    const newSelect = [...selectedPlans];
    newSelect.forEach((plan) => {
      plan.isUsing = false;
      return plan;
    });

    newSelect.push({
      plan_id: newPlanId,
      isUsing: true,
    });
    foundUser.selectedPlans = newSelect;
    await foundUser.save();

    return result;
  }

  async saveVideoToServer(videoFile: Express.Multer.File): Promise<string> {
    // Generate a file path where the video will be stored
    const fileName = `${Date.now()}-${videoFile.originalname}`;
    const filePath = path.join(this.videoUploadPath, fileName);

    // Save the video to the server
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, videoFile.buffer, (err) => {
        if (err) {
          reject('Failed to save video');
        }
        resolve(filePath);
      });
    });
  }

  async createByTrainer(dto: CreatePlanDto, pathThumb: string) {
    const obj = convertObjectId(dto.userId);
    const goal = convertObjectId(dto.goal);
    dto.goal = goal;
    const foundTrainer = await this.userService.findOneById(obj);
    if (foundTrainer.role === Role.USER) {
      throw new ForbiddenException();
    }
    const thumbUrl = await this.cloudService.uploadImage(pathThumb);
    dto.image = thumbUrl.url;
    return await this.workoutRepository.create(dto);
  }

  async addExToPlan(id: string, arr: any[]) {
    const obj = convertObjectId(id);
    const foundPlan = await this.workoutRepository.findById(obj);
    if (!foundPlan) {
      throw new NotFoundException('Workout plan not found');
    }

    foundPlan.weeklySchedule.push(...arr);
    return await foundPlan.save();
  }

  async updateInformationPlan(id: string, dto: UpdateWorkoutDto, image?: string) {
    const { goal, ...other } = dto;
    const objId = convertObjectId(id);
    let objGoal;
    if (goal) {
      objGoal = convertObjectId(goal);
    }
    if (image) {
      const thumbUrl = await this.cloudService.uploadImage(image);
      other.image = thumbUrl.url;
    }
    const filter = {
      _id: objId,
    };

    const update = {
      ...other,
      goal: objGoal,
    };

    const option = {
      new: true,
    };

    return await this.workoutRepository.updatePlan(filter, update, option);
  }

  async updateWeeklySchedule(id: string, dto: UpdateWeeklyScheduleDto) {
    const objId = convertObjectId(id);
    dto.weeklySchedule.forEach((schedule) => {
      schedule.exercises.forEach((exercise) => {
        exercise.exerciseId = new Types.ObjectId(exercise.exerciseId);
      });
    });
    const { weeklySchedule } = dto;
    const filter = {
      _id: objId,
    };

    const update = {
      weeklySchedule,
    };

    const option = {
      new: true,
    };
    return await this.workoutRepository.updatePlan(filter, update, option);
  }

  async getWorkoutRegistedByUser(userId: Types.ObjectId) {
    return await this.userService.findOneById(userId);
  }
}
