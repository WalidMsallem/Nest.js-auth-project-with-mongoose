import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './user.schema';
import { UserMethodes } from './dto/user.dto';
import { MailService } from 'src/mail/mail.server';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService,  UserMethodes,MailService]
})
export class UsersModule {}
