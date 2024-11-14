import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Goal, GoalSchema } from '@/schema/goal.schema';
import { WorkoutModule } from '../workout/workout.module';
import { CloudinaryService } from '@/shared/services/cloudinary.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Goal.name, schema: GoalSchema }]), WorkoutModule],
  controllers: [GoalController],
  providers: [GoalService, CloudinaryService],
  exports: [GoalService],
})
export class GoalModule {}
