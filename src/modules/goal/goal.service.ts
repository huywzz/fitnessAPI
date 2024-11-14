import { Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Model } from 'mongoose';
import { Goal } from '@/schema/goal.schema';
import { InjectModel } from '@nestjs/mongoose';
import { WorkoutService } from '../workout/workout.service';
import { CloudinaryService } from '@/shared/services/cloudinary.service';
import * as path from 'path';
import * as fs from 'fs';

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
      image:url.url
    })
    return await newGoal.save()
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
