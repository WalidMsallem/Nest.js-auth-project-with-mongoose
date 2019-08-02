import { Controller, Get, Post, Body, UseGuards, ParseIntPipe, Param, Req, ValidationPipe, UsePipes } from '@nestjs/common';
 
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { Tasks } from './tasks.interface';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
 import { AuthGuard } from '@nestjs/passport';
import {GetUser} from '../users/get-user-decorator'
import { matchingTaskTitleValidationPipe } from './pipe/matching-task-title-validation.pipe';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController  {

    constructor(private tasksService: TasksService) {

    }
    @UsePipes(matchingTaskTitleValidationPipe)
    @Post() 
        async create(@Body(ValidationPipe) createTaskDto: CreateTaskDto, @GetUser() user  ) {
        return await this.tasksService.create(createTaskDto ,user);
    }

    @Get() 
    async getAllTask(  filterDto : GetTasksFilterDto ) : Promise<Tasks[]> {
   
        return  await this.tasksService.getAllTasks()
      }

      @Get('/currentUser') 
      async getTaskByUser(  filterDto : GetTasksFilterDto, @GetUser() user) : Promise<Tasks[]> {
     
          return  await this.tasksService.getTasksByUser(filterDto,user)
        }
   
      @Get('/:id') 
      getTaskById(
        @Param('id') id : string 
        ):  Promise<Tasks> {
        return this.tasksService.getTaskById(id);
      }
  
}