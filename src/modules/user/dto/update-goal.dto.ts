import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateGoalDTO {
  @ApiProperty({
    example: '6727a2e134352929d378e13f',
  })
  @IsNotEmpty()
  goal: string;
}
