import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutPlanDto } from './dto/create-workout.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { TrainerAuth } from '@/shared/guards/trainer-auth.guard';
import { Trainer } from '@/shared/decorators/trainer.decorator';
import { GetDetailWorkOutDTO } from './dto/get-detail.workout-dto';

@ApiTags('workout')
@ApiBearerAuth('jwt')
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @UseGuards(TrainerAuth)
  @Post()
  async create(@Body() createWorkoutDto: CreateWorkoutPlanDto, @Trainer() trainer) {
    createWorkoutDto.trainerId = trainer._id;
    return await this.workoutService.create(createWorkoutDto);
  }

  @Get()
  findAll() {
    return this.workoutService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('')
    dto: GetDetailWorkOutDTO,
  ) {
    return this.workoutService.getWorkoutPlanById(dto.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutService.remove(+id);
  }
}
