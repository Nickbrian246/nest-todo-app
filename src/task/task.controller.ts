import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Res,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, DeleteTask, UpdateTask } from './dto';
//nota controller clinte
// service base de datos
// ToDo controller
@Controller('v1/task')
export class TaskController {
  constructor(private tasksService: TaskService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getTasks();
  }
  @Get(':client')
  getAllTaskByClient(@Param() req: any) {
    return this.tasksService.getTaskByClient(req);
  }

  @Post()
  createTask(@Body() req: { data: Task[] }, @Res() res: any) {
    return this.tasksService.createTasks(req.data, res);
  }

  @Put()
  updateTask(@Body() req: { data: UpdateTask[] }, @Res() res: any) {
    return this.tasksService.updateTask(req.data, res);
  }

  @Delete()
  deleteTask(@Body() req: { data: DeleteTask[] }, @Res() res: any) {
    return this.tasksService.deleteTasks(req.data, res);
  }
}
