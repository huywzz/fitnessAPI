import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserBMIDto } from './dto/update-user-BMI.dto';
import { User } from '@/shared/decorators/user.decorator';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';
import { UpdateGoalDTO } from './dto/update-goal.dto';

@ApiTags('User')
@ApiBearerAuth('jwt')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto.email, createUserDto.password);
  }

  @ApiOperation({ summary: 'get all user' })
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update-bmi')
  updateBMI(@User() user, @Body() updateUserDto: UpdateUserBMIDto) {
    console.log(user);

    return this.userService.updateBMI(updateUserDto, user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update-goal')
  updateGoal(@User() user, @Body() dto: UpdateGoalDTO) {
    return this.userService.updateGoal(dto, user._id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
