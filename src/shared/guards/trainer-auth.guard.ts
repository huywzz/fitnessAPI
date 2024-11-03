import { UserService } from '../../modules/user/user.service';
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ERRORS_DICTIONARY } from '../constraints/error-dictionary.constraint';
import { TrainerService } from '@/modules/trainer/trainer.service';

@Injectable()
export class TrainerAuth implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private trainerService:TrainerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new BadRequestException(ERRORS_DICTIONARY.TOKEN_ERROR);
    }

    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      const trainer = await this.trainerService.findOneByIdOrThrow(payload.sub);
      request['trainer'] = trainer;

      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
