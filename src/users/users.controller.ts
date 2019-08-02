

import { Controller, Get, Post, Body,ValidationPipe, UsePipes,UseGuards, Req, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { matchingUserValidationPipe } from './pipe/matching-user-validation.pipe';


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {

    }

    @UsePipes(matchingUserValidationPipe)
    @Post() 
    async create(@Body(ValidationPipe) createUserDto: CreateUserDto, @Req() req, @Res() res ) {
        return await this.usersService.create(createUserDto, req, res);
    }

    @Post('/:confirmToken')
    async confirmEmail(@Req() req, @Res() res ) {
        return await this.usersService.confirmEmail(req, res);
        
    }
   
    // This route will require successfully passing our default auth strategy (JWT) in order
    // to access the route
    @Get('test')
    @UseGuards(AuthGuard())
    testAuthRoute(){
        return {
            message: 'You did it!'
        }
    }
}
