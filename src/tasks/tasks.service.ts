import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
  import { Tasks } from './tasks.interface';
  import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

  constructor(@InjectModel('Tasks') private tasksModel: Model<Tasks>) {}

  async create(createTaskDto: CreateTaskDto,
                user
            ) {
       const newTask = { ...createTaskDto, userId : user._id } 
    let createdTask = new this.tasksModel(newTask);
    return await createdTask.save();
  }

  async getAllTasks( ): Promise<Tasks[]> {
         
         return await this.tasksModel.find()
  }

  async getTasksByUser(
    filterDto : GetTasksFilterDto,
    user
    ): Promise<Tasks[]> {
         
         return await this.tasksModel.find({userId : user._id})
  }

  async getTaskByTitle (title : string): Model<Tasks>{
       return await this.tasksModel.findOne({title})
 }
   
  async getTaskById(
    id : string
    ): Promise<Tasks> {
        
        const found = await this.tasksModel.findOne({ _id:  id  })
        if (!found) {
        throw new NotFoundException('task not found');
        }
        return found
}

 

}