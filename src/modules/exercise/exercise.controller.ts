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
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';
import { User } from '@/shared/decorators/user.decorator';

import sharp from 'sharp';

@ApiTags('exercise')
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

  @Get()
  findAll() {
    return this.exerciseService.findAll();
  }
  @ApiOperation({ summary: 'detail ex' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.exerciseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exerciseService.update(+id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseService.remove(+id);
  }
}
