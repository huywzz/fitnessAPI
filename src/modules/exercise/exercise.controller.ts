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
  UseGuards,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';
import { User } from '@/shared/decorators/user.decorator';

import sharp from 'sharp';
import { PaginationQueryDTO } from '@/shared/utils/paginationQuery.dto';

@ApiTags('exercise')
@ApiBearerAuth('jwt')
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @ApiOperation({ summary: 'create ex' })
  // @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @User() user,
    @Body() createExerciseDto: CreateExerciseDto,
    // @UploadedFile() file: Express.Multer.File,
    @UploadedFiles() obj: { file?: Express.Multer.File[]; thumbnail?: Express.Multer.File[] },
  ) {
    const pathFile = await this.exerciseService.saveVideoToServer(obj.file[0]);
    // const pathThumbnail = await this.exerciseService.saveVideoToServer(obj.thumbnail[0]);
    createExerciseDto.createdBy = user._id;

    return await this.exerciseService.create(createExerciseDto, pathFile);
  }

  @ApiOperation({ summary: 'get all ex' })
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDTO) {
    return await this.exerciseService.findAll(paginationQuery.limit, paginationQuery.page);
  }

  @ApiOperation({ summary: 'find by category' })
  @Get('/category/:categoryId/')
  async findByCategory(
    @Query() paginationQuery: PaginationQueryDTO,
    @Param('categoryId') categoryId: string,
  ) {
    console.log(categoryId);

    return await this.exerciseService.findByCategory(categoryId, paginationQuery.limit, paginationQuery.page);
  }

  @ApiOperation({ summary: 'detail ex' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.exerciseService.findOne(id);
  }

  @ApiOperation({ summary: 'update ex' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
    @User() user,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    updateExerciseDto.createdBy = user._id;
    if (file) {
      const path = await this.exerciseService.saveVideoToServer(file);
      return await this.exerciseService.update(id, updateExerciseDto, path);
    }
    return await this.exerciseService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseService.remove(+id);
  }
}
