import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { nodeMailer } from './nodemailer.config';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto, req, res) {

    crypto.randomBytes(32, (err, buffer) => {
      
      if (err) {
        console.log(err);
      }
      const token = buffer.toString('hex');
      this.userModel.findOne({email: createUserDto.email})
        .then(user => {
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

          bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) =>{
                  if (err) throw err;
                  newUser.password = hash;
                  let createdUser = new this.userModel(newUser);
                  createdUser.save()
              })
          })

        })
        .then(result => {
          nodeMailer.sendMail({
            to: req.body.email,
            from: 'shop@node-complete.com',
            subject: 'Signup succeeded!',
            html: `
              <p>Confirmation email</p>
              <p>Click this <a href="http://localhost:3000/users/${token}">link</a> to set confirm your account.</p>
            `
          })
          .then(email => res.json({email: 'sent'}))
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  async confirmEmail(req, res) {
    const confirmToken = req.params.confirmToken;
    var confirmUser;
    this.userModel.findOne({
        confirmToken: confirmToken,
        confirmTokenExpiration: { $gt: Date.now() },
      })
      .then(user => {
        confirmUser = user
        confirmUser.isActive = true;
        confirmUser.confirmToken = undefined;
        confirmUser.confirmTokenExpiration = undefined;
      })
      .then (active => {
        confirmUser.save();
        res.json({confirm: 'success'});
      })
      .catch(err => console.log(err))
  }

  async findOneByEmail(email): Model<User> {
  const user = await this.userModel.findOne({email});
    return  user
  }
}