import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GetAllDayDTO{
    @ApiProperty({
        example:'plan id'
    })
    @IsNotEmpty()
    planId:string
}