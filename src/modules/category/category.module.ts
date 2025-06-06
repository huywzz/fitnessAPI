import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '@/schema/category.schema';
import { CloudinaryService } from '@/shared/services/cloudinary.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoryController],
  providers: [CategoryService, CloudinaryService],
  exports: [CategoryService],
})
export class CategoryModule {}
