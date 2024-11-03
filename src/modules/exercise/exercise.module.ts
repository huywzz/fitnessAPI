import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from '@/schema/exercise.schema';
import { JwtService } from '@nestjs/jwt';
import { ExerciseRepository } from './exercise.repository';
import { CloudinaryService } from '@/shared/services/cloudinary.service';
import { TrainerModule } from '../trainer/trainer.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Exercise.name, schema: ExerciseSchema }]),TrainerModule],
  controllers: [ExerciseController],
  providers: [ExerciseService, JwtService, ExerciseRepository, CloudinaryService],
  exports: [ExerciseService, ExerciseRepository],
})
export class ExerciseModule {}
