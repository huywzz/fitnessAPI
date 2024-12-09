import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '@/schema/category.schema';
import { Model } from 'mongoose';
import * as path from 'path';
import * as fs from 'fs';
import { CloudinaryService } from '@/shared/services/cloudinary.service';
import { ExerciseService } from '../exercise/exercise.service';

@Injectable()
export class CategoryService {
  private readonly videoUploadPath = path.join(process.cwd(), 'src', 'shared', 'image');
  constructor(
    @InjectModel(Category.name) private cateModel: Model<Category>,
    private cloudService: CloudinaryService,
    private exService: ExerciseService,
  ) {
    if (!fs.existsSync(this.videoUploadPath)) {
      fs.mkdirSync(this.videoUploadPath, { recursive: true });
    }
  }
  async create(createCategoryDto: CreateCategoryDto, file: any) {
    const url = await this.cloudService.uploadImage(file);
    fs.unlinkSync(file);
    const newCate = new this.cateModel({
      image: url.url,
      name: createCategoryDto.name,
    });
    return await newCate.save();
  }

  async findByCategory(categoryId: string) {
    return await this.exService.findByCategory(categoryId);
  }

  
  async findAll() {
    return await this.cateModel.find();
  }

  async findOne(id: string) {
    return await this.cateModel.findById(id)
  }

  async update(id: string, updateGoalDto: UpdateCategoryDto, path?: string) {
    const foundCate = await this.cateModel.findById(id);

    if (!foundCate) {
      throw new BadRequestException('Category not found');
    }
    if (updateGoalDto.name) {
      foundCate.name = updateGoalDto.name;
    }
    if (path) {
      const url = await this.cloudService.uploadImage(path);
      fs.unlinkSync(path);
      foundCate.image = url.url;
    }

    return await foundCate.save();
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
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
