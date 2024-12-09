import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Model } from 'mongoose';
import { Goal } from '@/schema/goal.schema';
import { InjectModel } from '@nestjs/mongoose';
import { WorkoutService } from '../workout/workout.service';
import { CloudinaryService } from '@/shared/services/cloudinary.service';
import * as path from 'path';
import * as fs from 'fs';
import { convertObjectId } from '@/shared/utils/converToObjId';
import { title } from 'process';

@Injectable()
export class GoalService {
  private readonly videoUploadPath = path.join(process.cwd(), 'src', 'shared', 'store');
  constructor(
    @InjectModel(Goal.name) private goalModel: Model<Goal>,
    private workoutService: WorkoutService,
    private cloudService: CloudinaryService,
  ) {
    if (!fs.existsSync(this.videoUploadPath)) {
      fs.mkdirSync(this.videoUploadPath, { recursive: true });
    }
  }
  async create(createGoalDto: CreateGoalDto, pathFile: string) {
    const url = await this.cloudService.uploadImage(pathFile);
    fs.unlinkSync(pathFile);
    const newGoal = await this.goalModel.create({
      title: createGoalDto.title,
      image: url.url,
    });
    return await newGoal.save();
  }

  async findAll() {
    return await this.goalModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} goal`;
  }

  async update(id: string, updateGoalDto: UpdateGoalDto, path?: string) {
    const foundGoal = await this.goalModel.findById(id);
    console.log(foundGoal);
    console.log(updateGoalDto);
    
    if (!foundGoal) {
      throw new BadRequestException('Goal not found');
    }
    if (updateGoalDto.title) {
      foundGoal.title = updateGoalDto.title;
    }
    if (path) {
      const url = await this.cloudService.uploadImage(path);
      fs.unlinkSync(path);
      foundGoal.image = url.url;
    }

    return await foundGoal.save();
  }

  remove(id: number) {
    return `This action removes a #${id} goal`;
  }

  async findOneGoal(id: string) {
    const goal = convertObjectId(id);
    return await this.goalModel.findById(goal);
  }

  async findManyById(id: string) {
    return await this.workoutService.findWorkOutByGoal(id);
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
}
