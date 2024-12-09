import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'create category' })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFile() file: Express.Multer.File) {
    const pathFile = await this.categoryService.saveVideoToServer(file);
    return this.categoryService.create(createCategoryDto, pathFile);
  }

  @ApiOperation({ summary: 'get all category' })
  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'list ex by category' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findByCategory(id);
  }

  @ApiOperation({ summary: 'detail category' })
  @Get('/detail/:id')
  async detailCategory(@Param('id') id: string) {
    return await this.categoryService.findOne(id);
  }

  @ApiOperation({ summary: 'update category' })
  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      const path = await this.categoryService.saveVideoToServer(file);
      return await this.categoryService.update(id, updateGoalDto, path);
    }

    return await this.categoryService.update(id, updateGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
