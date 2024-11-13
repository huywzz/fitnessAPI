import { forwardRef, Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutPlan, WorkoutPlanSchema } from '@/schema/workplan.schema';
// import { TrainerModule } from '../trainer/trainer.module';
import { WorkoutRepository } from './workout.repository';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { CloudinaryService } from '@/shared/services/cloudinary.service';
import { ExerciseModule } from '../exercise/exercise.module';
import { LogWorkoutModule } from '../log-workout/log-workout.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WorkoutPlan.name, schema: WorkoutPlanSchema }]),
    UserModule,
    ExerciseModule,
    forwardRef(() => LogWorkoutModule),
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService, WorkoutRepository, JwtService, CloudinaryService],
  exports: [WorkoutService, WorkoutRepository],
})
export class WorkoutModule {}
