import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Get()
  hello() {
    return {
      mess:"hello world"
    }
  }
}
