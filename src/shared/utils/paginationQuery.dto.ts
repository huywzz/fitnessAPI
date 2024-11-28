import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsInt, Min, Max } from 'class-validator';

export class PaginationQueryDTO {
  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => (value ? +value : 1))
  page?: number = 1; // Mặc định là trang đầu tiên

  @ApiProperty({
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => (value ? +value : 1))
  limit?: number = 10;
}
