import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutPlanDto } from './dto/create-workout.dto';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Trainer } from '@/shared/decorators/trainer.decorator';
import { GetDetailWorkOutDTO } from './dto/get-detail.workout-dto';
import { User } from '@/shared/decorators/user.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterWorkoutDTO } from './dto/register-workout.dto';

@ApiTags('workout')
@ApiBearerAuth('jwt')
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @ApiOperation({ summary: 'create workout plan' })
  // @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createWorkoutDto: CreateWorkoutPlanDto,
    @User() user,
    // @UploadedFile() file?: Express.Multer.File,
  ) {
    createWorkoutDto.userId = user._id;
    return await this.workoutService.create(createWorkoutDto);
  }
  @ApiOperation({ summary: 'get all workout plan' })
  @Get()
  async findAll() {
    return await this.workoutService.findAll();
  }

  @ApiOperation({ summary: 'detail workout plan' })
  @Get(':id')
  async findOne(
    @Param('')
    dto: GetDetailWorkOutDTO,
  ) {
    return await this.workoutService.findOne(dto.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutService.remove(+id);
  }

  @ApiOperation({ summary: 'User đăng kí workout plan' })
  @UseGuards(JwtAuthGuard)
  @Post('register-plan')
  async registerPlan(@Body() dto: RegisterWorkoutDTO, @User() user) {
    return await this.workoutService.registerPlan(dto, user._id.toString());
  }
}
