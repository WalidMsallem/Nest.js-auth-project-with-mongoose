import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
import { TasksService } from '../tasks.service';

@Injectable()
export class matchingTaskTitleValidationPipe implements PipeTransform {

  constructor(private tasksService: TasksService) {

  }

   async transform  (value :any) {

 

      const task = await this.tasksService.getTaskByTitle(value.title)
      console.log(task)
           if(task) {
  
            throw new BadRequestException(' task with this title is already exist');
           }else {
             return value
           }
   
  }

 
}
