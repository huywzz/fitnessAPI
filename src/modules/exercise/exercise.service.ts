import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { CloudinaryService } from '@/shared/services/cloudinary.service';
import { ExerciseRepository } from './exercise.repository';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ExerciseService {
  private readonly videoUploadPath = path.join(process.cwd(), 'src', 'shared', 'store');
  constructor(
    private cloudService: CloudinaryService,
    private exRepository: ExerciseRepository,
  ) {
    if (!fs.existsSync(this.videoUploadPath)) {
      fs.mkdirSync(this.videoUploadPath, { recursive: true });
    }
  }
  async create(createExerciseDto: CreateExerciseDto, pathFile: string) {
    const url = await this.cloudService.uploadImage(pathFile);
    createExerciseDto.gifUrl = url.url;
    fs.unlinkSync(pathFile);
    return await this.exRepository.create(createExerciseDto);
  }

  findAll() {
    return `This action returns all exercise`;
  }

  async findOne(id:string) {
    return await this.exRepository.findById(id)
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
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
