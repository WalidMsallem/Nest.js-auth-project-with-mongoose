import { Controller, Get, Post, Body, UseGuards, ParseIntPipe, Param, Req } from '@nestjs/common';
 
  import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { Tasks } from './tasks.interface';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
 import { AuthGuard } from '@nestjs/passport';
import {GetUser} from '../users/get-user-decorator'
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController  {

    constructor(private tasksService: TasksService) {

    }

    @Post() 
    async create(@Body() createTaskDto: CreateTaskDto, @GetUser() user  ) {
        return await this.tasksService.create(createTaskDto ,user);
    }

    @Get() 
    // @UseGuards(AuthGuard())
    async getHello(  filterDto : GetTasksFilterDto, @GetUser() user) : Promise<Tasks[]> {
   
        return  await this.tasksService.getTasks(filterDto,user)
      }
   
   
      @Get('/:id') 
      getTaskById(
        @Param('id') id : string 
        ):  Promise<Tasks> {
        return this.tasksService.getTaskById(id);
      }
    // This route will require successfully passing our default auth strategy (JWT) in order
    // to access the route
    // @Get('test')
    // @UseGuards(AuthGuard())
    // testAuthRoute(){
    //     return {
    //         message: 'You did it!'
    //     }
    // }

}