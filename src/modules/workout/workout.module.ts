import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutPlan, WorkoutPlanSchema } from '@/schema/workplan.schema';
import { TrainerModule } from '../trainer/trainer.module';
import { WorkoutRepository } from './workout.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WorkoutPlan.name, schema: WorkoutPlanSchema }]),
    TrainerModule,
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService, WorkoutRepository,JwtService],
  exports: [WorkoutService, WorkoutRepository],
})
export class WorkoutModule {}
