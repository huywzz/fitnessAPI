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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';
import { User } from '@/shared/decorators/user.decorator';

@ApiTags('exercise')
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @ApiOperation({ summary: 'create ex' })
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @User() user,
    @Body() createExerciseDto: CreateExerciseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const pathFile = await this.exerciseService.saveVideoToServer(file);
    createExerciseDto.createdBy = user._id;

    return this.exerciseService.create(createExerciseDto, pathFile);
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
