import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { matchingUserValidationPipe } from './pipe/matching-user-validation.pipe';
 

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {

    }
    @UsePipes(matchingUserValidationPipe)
    @Post() 
    async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }
    @Post("/email") 
    async findbyemail(@Body('email') email ) {
    
        return await this.usersService.findOneByEmail(email);
    }
 

}