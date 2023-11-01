import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateToDoDto,
  DeleteToDoDto,
  FindByClinetToDoDto,
  UpdateToDoDto,
} from './to-do.tdo/to-do';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ToDoTaskService } from './to-do-task.service';

@Controller('to-do-task')
export class ToDoTaskController {
  constructor(private ToDoTaskService: ToDoTaskService) {}

  @Get()
  getAllTasks() {
    return this.ToDoTaskService.getToDo();
  }
  @Get(':client')
  getAllTaskByClient(@Param() req: FindByClinetToDoDto) {
    return this.ToDoTaskService.getToDosByClient(req);
  }

  @Post()
  createTask(@Body() req: CreateToDoDto) {
    return this.ToDoTaskService.createToDo(req);
  }

  @Put()
  updateTask(@Body() req: UpdateToDoDto) {
    return this.ToDoTaskService.updatToDo(req);
  }

  @Delete()
  deleteTask(@Body() req: DeleteToDoDto) {
    return this.ToDoTaskService.deleteToDo(req);
  }
}
