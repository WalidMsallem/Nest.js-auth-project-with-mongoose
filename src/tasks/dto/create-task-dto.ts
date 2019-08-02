import { IsString, MaxLength, MinLength, Matches } from "class-validator";


export class CreateTaskDto {

     
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly title: string;

    @IsString()
    @MinLength(10)
    @MaxLength(35)
    readonly description: string;
}