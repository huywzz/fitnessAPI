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
  Query,
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
import { Difficulty } from '@/schema/enums/difficulty.enum';
import { QueryWorkoutDTO } from './dto/query-workout.dto';
import { CreatePlanDto } from './dto/create-plan.dto';
import { AddEXDto } from './dto/add.ex.dto';
import { RecommendPlanDTO } from './dto/rcm-plan.dto';

@ApiTags('workout')
@ApiBearerAuth('jwt')
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  // @ApiOperation({ summary: 'create workout plan' })
  // @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(JwtAuthGuard)
  // @Post()
  // async create(
  //   @Body() createWorkoutDto: CreateWorkoutPlanDto,
  //   @User() user,
  //   // @UploadedFile() file?: Express.Multer.File,
  // ) {
  //   createWorkoutDto.userId = user._id;
  //   return await this.workoutService.create(createWorkoutDto);
  // }

  @ApiOperation({ summary: 'create workout plan without ex' })
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreatePlanDto, @User() user, @UploadedFile() file?: Express.Multer.File) {
    let path = null;
    if (file) {
      path = await this.workoutService.saveVideoToServer(file);
    } else {
      path = process.env.DEFAULT_THUMB_PLAN;
    }
    dto.userId = user._id;
    return await this.workoutService.createByTrainer(dto, path);
  }

  @ApiOperation({ summary: 'Add ex to plan' })
  @Post(':id/add-schedule')
  async addExToPlan(@Param('id') id: string, @Body() dto: AddEXDto) {
    return await this.workoutService.addExToPlan(id, dto.schedules);
  }

  @ApiOperation({ summary: 'rcm workout plan with bmi and goal' })
  @Get('/recommend-plan')
  async rcmPlan(@Query() dto: RecommendPlanDTO) {
    return await this.workoutService.rcmPlan(dto);
  }

  @ApiOperation({ summary: 'find workout plan' })
  @Get('/find')
  async findByQuery(@Query() dto: QueryWorkoutDTO) {
    console.log(dto);

    return await this.workoutService.findByQuery(dto.goal, dto.difficulty);
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
