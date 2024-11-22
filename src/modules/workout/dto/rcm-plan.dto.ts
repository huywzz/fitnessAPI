import { BMI } from '@/schema/enums/bmi.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsMongoId } from 'class-validator';

export class RecommendPlanDTO {
  @ApiProperty({
    description: 'BMI for user',
    example: BMI.TooFat,
    required: true,
  })
  @Transform(({ value }) => parseInt(value, 10))
  @IsEnum(BMI)
  bmi: BMI;

  @ApiProperty({
    description: 'Goal of user',
    example: '67355aef308dac0121bb1b6d',
    required: true,
  })
  @IsMongoId()
  goal: string;
}
