// import { UsersService } from '@/modules/users/users.service';
// import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { ERRORS_DICTIONARY } from '../constraints/error-dictionary.constraint';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   constructor(
//     private jwtService: JwtService,
//     private userService: UsersService
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request);

//     if (!token) {
//       throw new BadRequestException(ERRORS_DICTIONARY.TOKEN_ERROR);
//     }

//     try {
//       const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET_KEY });
//       const user = await this.userService.findOne(payload.userId);
//       request['user'] = user;

//       return true;
//     } catch (error) {
//       throw new BadRequestException(error.message);
//     }
//   }

//   private extractTokenFromHeader(request: any): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }
