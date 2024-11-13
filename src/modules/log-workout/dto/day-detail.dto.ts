import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DayDetailDTO {
  @ApiProperty({
    example: '67336749e018930f3abdf57e',
  })
  @IsNotEmpty()
  planId: string;

  @ApiProperty({
    example: '1',
  })
  @IsNotEmpty()
  numberDay: number;
}