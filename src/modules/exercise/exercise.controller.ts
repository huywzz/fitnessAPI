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
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TrainerAuth } from '@/shared/guards/trainer-auth.guard';
import { Trainer } from '@/shared/decorators/trainer.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('exercise')
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @UseGuards(TrainerAuth)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(
    @Trainer() trainer,
    @Body() createExerciseDto: CreateExerciseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const pathFile =await this.exerciseService.saveVideoToServer(file);
    console.log(trainer);
    createExerciseDto.createdBy = trainer._id

    return this.exerciseService.create(createExerciseDto,pathFile);
  }

  @Get()
  findAll() {
    return this.exerciseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseService.findOne(id);
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
