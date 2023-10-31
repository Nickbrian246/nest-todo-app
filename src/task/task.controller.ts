import { Controller, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private tasksService: TaskService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getTasks();
  }

  @Post()
  createTask(@Body() req: any) {
    return this.tasksService.createTasks(req);
  }

  @Put()
  updateTask(@Body() req: any) {
    return this.tasksService.updateTask(req);
  }

  @Delete()
  deleteTask(@Body() req: any) {
    return this.tasksService.deleteTasks(req);
  }
}
