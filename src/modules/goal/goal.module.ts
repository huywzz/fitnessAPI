import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Goal, GoalSchema } from '@/schema/goal.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Goal.name, schema: GoalSchema }])],
  controllers: [GoalController],
  providers: [GoalService],
  exports:[GoalService]
})
export class GoalModule {}
