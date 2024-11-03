import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignUpEmailDto } from './dto/signUpEmail.dto';
import { LoginEmailDto } from './dto/loginEmail.dto';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';
import { User } from '@/shared/decorators/user.decorator';
import { LoginSocialDto } from './dto/loginSocial.dto';

@ApiTags('Auth')
@ApiBearerAuth('jwt')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async hello(@User() user) {
    return await this.authService.test()
  }

  @Post('/sign-up')
  async signUpByEmail(@Body() dto: SignUpEmailDto) {
    return await this.authService.signUpEmail(dto);
  }

  @Post('/login')
  async loginByEmail(@Body() dto: LoginEmailDto) {
    return await this.authService.loginByEmail(dto);
  }

  @Post('/login-social')
  async loginBySocial(@Body() dto: LoginSocialDto) {
    return await this.authService.loginSocial(dto);
  }

  @Post('/sign-up-trainer')
  async signUpByTrainer(@Body() dto: SignUpEmailDto) {
    return await this.authService.signTrainer(dto);
  }

  @Post('/login-trainer')
  async loginTrainer(@Body() dto: LoginEmailDto) {
    return await this.authService.loginTrainer(dto)
  }
}
