import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { JointaskandkanbanService } from './jointaskandkanban.service';
import {
  UpdateJoinTaskAndKanbanTdo,
  CreateJoinTaskAndKanbanTdo,
  DeleteJoinTaskAndKanbanTdo,
} from './tdo';

@Controller('jointaskandkanban')
export class JointaskandkanbanController {
  constructor(private JoinTasks: JointaskandkanbanService) {}

  @Post()
  createTask(@Body() req: CreateJoinTaskAndKanbanTdo) {
    return this.JoinTasks.createTask(req);
  }

  @Put()
  updateTask(@Body() req: UpdateJoinTaskAndKanbanTdo) {
    return this.JoinTasks.updatTask(req);
  }

  @Delete()
  deleteTask(@Body() req: DeleteJoinTaskAndKanbanTdo) {
    return this.JoinTasks.deleteTask(req);
  }
}
