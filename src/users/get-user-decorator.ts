import { createParamDecorator } from "@nestjs/common";
import { Model } from 'mongoose';
import { User } from './user.interface';


export const GetUser = createParamDecorator((data, req): Model<User>  => {
    return req.user
})