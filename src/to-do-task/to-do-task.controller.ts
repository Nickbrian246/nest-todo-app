import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  CreateToDoDto,
  DeleteToDoDto,
  FindByClinetToDoDto,
  UpdateToDoDto,
} from './to-do.tdo/to-do';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ToDoTaskService } from './to-do-task.service';

@Controller('v1/to-do-task')
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
  createTask(@Body() req: { data: CreateToDoDto[] }, @Res() res: any) {
    return this.ToDoTaskService.createToDo(req.data, res);
  }

  @Put()
  updateTask(@Body() req: { data: UpdateToDoDto[] }, @Res() res: any) {
    return this.ToDoTaskService.updatToDo(req.data, res);
  }

  @Delete()
  deleteTask(@Body() req: { data: DeleteToDoDto[] }, @Res() res: any) {
    return this.ToDoTaskService.deleteToDo(req.data, res);
  }
}
