import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trainer, TrainerSchema } from '@/schema/trainer.schema';
import { TrainerRepository } from './trainer.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Trainer.name, schema: TrainerSchema }])],
  controllers: [TrainerController],
  providers: [TrainerService, TrainerRepository, JwtService],
  exports: [TrainerService, TrainerRepository],
})
export class TrainerModule {}
