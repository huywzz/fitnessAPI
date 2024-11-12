import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetDetailWorkOutDTO {
  @ApiProperty({
    example: '67289b16079323868f372c8c',
  })
  @IsNotEmpty()
  id: string;
}
