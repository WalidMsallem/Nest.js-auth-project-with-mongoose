import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { nodeMailer } from '../config/nodemailer.config';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import {UserMethodes } from './dto/user.dto'

@Injectable()
export class UsersService {

  constructor(
              @InjectModel('User') private userModel: Model<User>,
            private userMethodes : UserMethodes
               ) {}



  async create(createUserDto: CreateUserDto, httpMethodes) { 
    await  this.userMethodes.createUser(createUserDto, httpMethodes)     
    }
    
    

  async confirmEmail(req, res) {
    const confirmToken = req.params.confirmToken;
    var confirmUser;
   const user = await  this.userModel.findOne({
        confirmToken: confirmToken,
        confirmTokenExpiration: { $gt: Date.now() },
      })

      
        confirmUser = user
        confirmUser.isActive = true;
        confirmUser.confirmToken = undefined;
        confirmUser.confirmTokenExpiration = undefined;
      

        await confirmUser.save();
        res.json({confirm: 'success'});
     
       
  }

  async findOneByEmail(email): Model<User> {
  const user = await this.userModel.findOne({email});
    return  user
  }
}