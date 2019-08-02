import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../user.interface";
import { Model } from 'mongoose';
import { nodeMailer } from '../../config/nodemailer.config';
import { CreateUserDto } from '../dto/create-user.dto';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { MailService } from "src/mail/mail.server";

@Injectable()
export class UserMethodes   {
    constructor(@InjectModel('User') private userModel: Model<User>,
                  private  mailService :  MailService
                   ) {}
 

    async createToken () {
        const buffer = await  crypto.randomBytes(32)
      
        if (!buffer) {
          console.log("error when create buffer for email");
        }
        
        return   buffer.toString('hex');
      }
      
      async createaNotconfirmedUser(createUserDto: CreateUserDto ,httpMethodes ,token) {
        const {req , res } = httpMethodes
        const user = await  this.userModel.findOne({email: createUserDto.email})
              
        if (user) {
            return res.status(400).json({email: 'Email already exist'});
        }
      
        const newUser = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            organization: req.body.organization,
            confirmToken: token,
            confirmTokenExpiration: Date.now() + 3600000,
        };
      
       
      
        const salt = await  bcrypt.genSalt(10)
        const hash =  await bcrypt.hash(newUser.password, salt)
        if (!hash) {
          throw new NotFoundException('cannot send email code h');     
        }
        newUser.password = hash;
        let createdUser = new this.userModel(newUser);
        createdUser.save()
         
      
      }

     async  createUser (createUserDto: CreateUserDto, httpMethodes) {


       const token = await this.createToken()

       const {req , res } = httpMethodes
       const emailDetails = {
            to: req.body.email,
            from: 'shop@node-complete.com',
            subject: 'Signup succeeded!',
            content: `
              <p>Confirmation email</p>
              <p>Click this <a href="http://localhost:3000/users/${token}">link</a> to set confirm your account.</p>
            `
          }

       await  this.createaNotconfirmedUser(createUserDto, httpMethodes,token)
       await this.mailService.sendVerifyEMail(token , httpMethodes,emailDetails)
      }
}
    