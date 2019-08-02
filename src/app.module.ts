import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule,
    TasksModule,
    MongooseModule.forRoot('mongodb://localhost/authexample')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
