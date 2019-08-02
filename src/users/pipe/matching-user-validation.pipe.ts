import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class matchingUserValidationPipe implements PipeTransform {

  constructor(private usersService: UsersService) {

  }

   async transform  (value :any) {

 

      const user = await this.usersService.findOneByEmail(value.email)
           if(user) {
  
            throw new BadRequestException(' user is already exist');
           }else {
             return value
           }
   
  }

 
}
