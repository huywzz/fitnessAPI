import { forwardRef, Module } from '@nestjs/common';
import { LogWorkoutService } from './log-workout.service';
import { LogWorkoutController } from './log-workout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutLog, WorkoutLogSchema } from '@/schema/workout-log.schema';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { WorkoutModule } from '../workout/workout.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WorkoutLog.name, schema: WorkoutLogSchema }]),
    UserModule,
    forwardRef(() => WorkoutModule),
    // WorkoutModule,
  ],
  controllers: [LogWorkoutController],
  providers: [LogWorkoutService,JwtService,],
  exports: [LogWorkoutService],
})
export class LogWorkoutModule {}
