import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, DeleteTask } from './dto';
//nota controller clinte
// service base de datos
@Controller('task')
export class TaskController {
  constructor(private tasksService: TaskService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getTasks();
  }
  @Get(':id')
  getAllTaskByClient(@Param() req: string) {
    return this.tasksService.getTaskByClient(req);
  }

  @Post()
  createTask(@Body() req: Task) {
    return this.tasksService.createTasks(req);
  }

  @Put()
  updateTask(@Body() req: any) {
    return this.tasksService.updateTask(req);
  }

  @Delete()
  deleteTask(@Body() req: DeleteTask) {
    return this.tasksService.deleteTasks(req);
  }
}
