import { Difficulty } from '@/schema/enums/difficulty.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class QueryWorkoutDTO {
  @ApiProperty({
    example: '67355aef308dac0121bb1b6b',
    required: false,
  })
  @IsString()
  @IsOptional()
  goal: string;

  @ApiProperty({
    example: 'BEGINNER',
    required: false,
  })
  @IsEnum(Difficulty)
  @IsOptional()
  difficulty: Difficulty;
}
