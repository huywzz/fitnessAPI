import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '@/schema/category.schema';
import { Model } from 'mongoose';
import * as path from 'path';
import * as fs from 'fs';
import { CloudinaryService } from '@/shared/services/cloudinary.service';

@Injectable()
export class CategoryService {
  private readonly videoUploadPath = path.join(process.cwd(), 'src', 'shared', 'image');
  constructor(
    @InjectModel(Category.name) private cateModel: Model<Category>,
    private cloudService: CloudinaryService,
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
      name:createCategoryDto.name
    })
    return await newCate.save()
  }

  async findAll() {
    return await this.cateModel.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
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
