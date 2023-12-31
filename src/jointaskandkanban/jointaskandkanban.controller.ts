import { Body, Controller, Delete, Post, Put, Res } from '@nestjs/common';
import { JointaskandkanbanService } from './jointaskandkanban.service';
import {
  UpdateJoinTaskAndKanbanTdo,
  CreateJoinTaskAndKanbanTdo,
  DeleteJoinTaskAndKanbanTdo,
} from './tdo';

@Controller('v1/jointaskandkanban')
export class JointaskandkanbanController {
  constructor(private JoinTasks: JointaskandkanbanService) {}

  @Post()
  createTask(
    @Body() req: { data: CreateJoinTaskAndKanbanTdo[] },
    @Res() res: any,
  ) {
    return this.JoinTasks.createTask(req.data, res);
  }

  @Put()
  updateTask(
    @Body() req: { data: UpdateJoinTaskAndKanbanTdo[] },
    @Res() res: any,
  ) {
    return this.JoinTasks.updatTask(req.data, res);
  }

  @Delete()
  deleteTask(
    @Body() req: { data: DeleteJoinTaskAndKanbanTdo[] },
    @Res() res: any,
  ) {
    return this.JoinTasks.deleteTask(req.data, res);
  }
}
