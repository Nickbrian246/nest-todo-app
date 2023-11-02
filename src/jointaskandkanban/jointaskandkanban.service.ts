import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from 'src/schemas/task.schema';
import { TodoTask } from 'src/schemas/todo.task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UpdateJoinTaskAndKanbanTdo,
  CreateJoinTaskAndKanbanTdo,
  DeleteJoinTaskAndKanbanTdo,
} from './tdo';
import {
  checkIfIsFromTodoOrKankan,
  addPropertiesToCompleteKanban,
  filterPropiertiesForToDo,
} from './utils';
import { validateTaskStatus } from './valildations/taskStatusValidate';
// en el  servicio inyecto el schema
@Injectable()
export class JointaskandkanbanService {
  constructor(
    @InjectModel(TodoTask.name) private TodoTask: Model<TodoTask>,
    @InjectModel(Task.name) private TaskKanban: Model<Task>,
  ) {}

  async createTask(task: CreateJoinTaskAndKanbanTdo) {
    try {
      const isToDo = checkIfIsFromTodoOrKankan(task);
      if (isToDo) {
        await this.TodoTask.create(task);
        const kanban = addPropertiesToCompleteKanban(task);
        return await this.TaskKanban.create(kanban);
      } else {
        const validateKanbanTaskStatus = validateTaskStatus(task);
        if (!validateKanbanTaskStatus) {
          throw new HttpException(
            'TaskStatus no permitido ',
            HttpStatus.BAD_REQUEST,
          );
        }
        await this.TaskKanban.create(task);
        const toDo = filterPropiertiesForToDo(task);
        return await this.TodoTask.create(toDo);
      }
    } catch (error) {
      return error;
    }
  }

  async updatTask(newTask: UpdateJoinTaskAndKanbanTdo) {
    const { id, client } = newTask;
    const task = await this.TodoTask.findByIdAndUpdate(
      { _id: id, client },
      newTask,
    );

    return task;
  }

  async deleteTask(taskId: DeleteJoinTaskAndKanbanTdo) {
    const { id, client } = taskId;
    const taskDelete = await this.TodoTask.deleteOne({ _id: id, client });

    return taskDelete;
  }
}
