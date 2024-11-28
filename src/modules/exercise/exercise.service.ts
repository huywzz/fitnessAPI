import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { CloudinaryService } from '@/shared/services/cloudinary.service';
import { ExerciseRepository } from './exercise.repository';
import * as path from 'path';
import * as fs from 'fs';
import { UserService } from '../user/user.service';
import { Role } from '@/schema/enums/role.enum';
import { Types } from 'mongoose';
import * as sharp from 'sharp';
import { convertObjectId } from '@/shared/utils/converToObjId';
import { PaginationResult } from '@/shared/interfaces/pagination-result.interface';
import { Exercise } from '@/schema/exercise.schema';

@Injectable()
export class ExerciseService {
  private readonly videoUploadPath = path.join(process.cwd(), 'src', 'shared', 'store');
  constructor(
    private cloudService: CloudinaryService,
    private exRepository: ExerciseRepository,
    private userService: UserService,
  ) {
    if (!fs.existsSync(this.videoUploadPath)) {
      fs.mkdirSync(this.videoUploadPath, { recursive: true });
    }
  }
  async create(createExerciseDto: CreateExerciseDto, pathFile: string) {
    const user = await this.userService.findOneById(createExerciseDto.createdBy);

    if (user.role !== Role.TRAINER) {
      throw new ForbiddenException();
    }
    const gifData = fs.readFileSync(pathFile);

    const thumbnailPath = pathFile.replace('.gif', '.png');
    await sharp(gifData, { pages: 1 }).png().toFile(thumbnailPath);

    const videoUrl = await this.cloudService.uploadImage(pathFile);
    const thumbnailUrl = await this.cloudService.uploadImage(thumbnailPath);

    createExerciseDto.gifUrl = videoUrl.url;
    createExerciseDto.thumbnail = thumbnailUrl.url;

    fs.unlink(pathFile, (err) => {
      if (err) console.error('Error deleting file:', err);
    });
    fs.unlink(thumbnailPath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    return await this.exRepository.create(createExerciseDto);
  }

  private async paginate(query: any, limit: number, page: number) {
    const totalRecords = await this.exRepository.countDocuments(query); // Đếm tổng số bản ghi theo query
    const totalPages = Math.ceil(totalRecords / limit);
    const offset = (page - 1) * limit;
    const data = await this.exRepository.findAllPaginated(query, limit, offset); // Truyền query vào repository

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

  async findByCategory(categoryId: string, limit = 10, offset = 0) {
    const category = convertObjectId(categoryId);
    return this.paginate({ category: category }, limit, offset);
  }

  async findOne(id: string) {
    return await this.exRepository.findById(id);
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto, pathFile?: string) {
    const obj = convertObjectId(id);
    let objCate;
    let objCreatedBy;
    const { category, createdBy, ...other } = updateExerciseDto;
    objCreatedBy = convertObjectId(createdBy);

    const foundTrainer = await this.userService.findOneById(objCreatedBy);
    if (foundTrainer.role === Role.USER) {
      throw new ForbiddenException();
    }
    if (category) {
      objCate = convertObjectId(category);
    }

    if (pathFile) {
      const gifData = fs.readFileSync(pathFile);

      const thumbnailPath = pathFile.replace('.gif', '.png');
      await sharp(gifData, { pages: 1 }).png().toFile(thumbnailPath);

      const videoUrl = await this.cloudService.uploadImage(pathFile);
      const thumbnailUrl = await this.cloudService.uploadImage(thumbnailPath);

      other.gifUrl = videoUrl.url;
      other.thumbnail = thumbnailUrl.url;

      fs.unlink(pathFile, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
      fs.unlink(thumbnailPath, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    const filter = {
      _id: obj,
    };
    const update = {
      ...other,
      category: objCate,
      createdBy: objCreatedBy,
    };
    const option = {
      new: true,
    };

    return await this.exRepository.updateExercise(filter, update, option);
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
