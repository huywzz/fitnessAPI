import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LogWorkoutService } from './log-workout.service';
import { CreateLogWorkoutDto } from './dto/create-log-workout.dto';
import { UpdateLogWorkoutDto } from './dto/update-log-workout.dto';
import { GetAllDayDTO } from './dto/get-all-day.dto';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';
import { User } from '@/shared/decorators/user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DayDetailDTO } from './dto/day-detail.dto';
import { UpdateExerciseCompleteDTO } from './dto/update-ex-log.dto';

@ApiTags('Log workout')
@ApiBearerAuth('jwt')
@Controller('log-workout')
export class LogWorkoutController {
  constructor(private readonly logWorkoutService: LogWorkoutService) {}

  // @Post()
  // create(@Body() createLogWorkoutDto: CreateLogWorkoutDto) {
  //   return this.logWorkoutService.create(createLogWorkoutDto);
  // }

  // @Get()
  // findAll() {
  //   return this.logWorkoutService.findAll();
  // }

  @ApiOperation({ summary: 'get plan  register by user' })
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getLogWorkout(@User() user) {
    console.log(user);

    return await this.logWorkoutService.getLogWorkout(user._id);
  }

  @ApiOperation({ summary: 'detail 1 workout plan registed by user' })
  @UseGuards(JwtAuthGuard)
  @Get(':planId')
  async findOne(@Param() dto: GetAllDayDTO, @User() user) {
    return await this.logWorkoutService.findOne(dto, user._id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogWorkoutDto: UpdateLogWorkoutDto) {
    return this.logWorkoutService.update(+id, updateLogWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logWorkoutService.remove(+id);
  }
  @ApiOperation({ summary: 'get detail 1 day of workout plan registed by user' })
  @UseGuards(JwtAuthGuard)
  @Get(':planId/:numberDay')
  async detailDay(@Param() dto: DayDetailDTO, @User() user) {
    return await this.logWorkoutService.dayDetail(dto, user._id);
  }

  @ApiOperation({ summary: 'update complete ex' })
  @UseGuards(JwtAuthGuard)
  @Post('complete-excicrise')
  async complateEx(@Body() dto: UpdateExerciseCompleteDTO, @User() user) {
    return await this.logWorkoutService.updateExerciseComplete(
      dto.workoutLogId,
      dto.dayNumber,
      dto.exerciseIndex,
    );
  }
}
