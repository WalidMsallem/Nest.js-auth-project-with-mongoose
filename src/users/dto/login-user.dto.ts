
import { IsString, MaxLength, MinLength, Matches } from "class-validator";


export class LoginUserDto {
    // @IsString()
    // @MinLength(4)
    // @MaxLength(20)
    readonly email: string;

    // @IsString()
    // @MinLength(6)
    // @MaxLength(20)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message : 'password too weak'})
    readonly password: string;
}

