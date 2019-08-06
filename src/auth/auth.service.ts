import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService){

    }

    async validateUserByPassword(loginAttempt: LoginUserDto) {

        // This will be used for the initial login
        let userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);
        
        const result =  await  userToAttempt.checkPassword(loginAttempt.password)
       
        return new Promise((resolve) => {
        if(result.err) throw new UnauthorizedException();
                    if(result.isMatch){
                        // If there is a successful match, generate a JWT for the user
                        resolve(this.createJwtPayload(userToAttempt));

                    } else {
                    throw new UnauthorizedException();
                
                    }

                });

    }

    async validateUserByJwt(payload: JwtPayload) { 

        // This will be used when the user has already logged in and has a JWT
        let user = await this.usersService.findOneByEmail(payload.email);

        if(user){
           
        //    return this.createJwtPayload(user);
            return  user
        } else {
            throw new UnauthorizedException();
        }

    }

    createJwtPayload(user){

        let data: JwtPayload = {
            email: user.email
        };

        let jwt = this.jwtService.sign(data);

        return {
            expiresIn: 3600,
            token: jwt            
        }

    }

}
