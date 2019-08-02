import { IsString, MaxLength, MinLength, Matches, IsEmail } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(4)
 
    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message : 'password too weak'})
    
    readonly password: string;
}