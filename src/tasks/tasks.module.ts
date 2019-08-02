import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { TaskSchema } from './tasks.schema';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
 

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Tasks', schema: TaskSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
   exports: [TasksService],
   controllers: [TasksController],
   providers: [TasksService]
})
export class TasksModule {}
