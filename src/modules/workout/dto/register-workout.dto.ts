import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RegisterWorkoutDTO {
  @ApiProperty({
    example: '67336749e018930f3abdf57e',
  })
  @IsNotEmpty()
  planId: string;
}