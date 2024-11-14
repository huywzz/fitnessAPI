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
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('goal')
@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(@Body() createGoalDto: CreateGoalDto, @UploadedFile() file: Express.Multer.File) {
    const pathFile = await this.goalService.saveVideoToServer(file);
    return await this.goalService.create(createGoalDto, pathFile);
  }

  @Get()
  async findAll() {
    return await this.goalService.findAll();
  }

  @ApiOperation({ summary: 'get workplan by goal' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.goalService.findManyById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalService.update(+id, updateGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalService.remove(+id);
  }
}
