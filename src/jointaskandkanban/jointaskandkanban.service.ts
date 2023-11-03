import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/task.schema';
import { v4 as uuid } from 'uuid';
import { TodoTask } from 'src/schemas/todo.task.schema';
import {
  CreateJoinTaskAndKanbanTdo,
  DeleteJoinTaskAndKanbanTdo,
  UpdateJoinTaskAndKanbanTdo,
} from './tdo';
import {
  addPropertiesToCompleteKanban,
  checkIfIsFromTodoOrKankan,
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

  async createTask(tasks: CreateJoinTaskAndKanbanTdo[], @Res() res: any) {
    try {
      const createTasks = tasks.map(async (task) => {
        try {
          const isToDo = checkIfIsFromTodoOrKankan(task);
          const commonId = uuid();
          const addCommonId = { ...task, commonId };
          if (isToDo) {
            await this.TodoTask.create(addCommonId);
            const kanban = addPropertiesToCompleteKanban(addCommonId);
            return await this.TaskKanban.create(kanban);
          } else {
            const validateKanbanTaskStatus = validateTaskStatus(addCommonId);
            if (!validateKanbanTaskStatus) {
              throw new HttpException(
                'TaskStatus no permitido ',
                HttpStatus.BAD_REQUEST,
              );
            }

            await this.TaskKanban.create(addCommonId);
            const toDo = filterPropiertiesForToDo(addCommonId);
            return await this.TodoTask.create(toDo);
          }
        } catch (error) {
          throw error;
        }
      });
      await Promise.all(createTasks);
      return res
        .status(HttpStatus.CREATED)
        .json({ message: 'To-Dos creados exitosamenete' });
    } catch (error) {
      return error;
    }
  }

  async updatTask(newTasks: UpdateJoinTaskAndKanbanTdo[], @Res() res: any) {
    try {
      const updateTasks = newTasks.map(async (newTask) => {
        const { client, commonId } = newTask;
        try {
          const isToDo = checkIfIsFromTodoOrKankan(newTask);
          if (isToDo) {
            //update Todo first
            await this.TodoTask.findOneAndUpdate({ commonId, client }, newTask);
            const addMissingPropertiesToKanban =
              addPropertiesToCompleteKanban(newTask);
            return await this.TaskKanban.findOneAndUpdate(
              { commonId, client },
              addMissingPropertiesToKanban,
            );
          }
          //Then update kanban
          const validateIfStatusTaskIsCorrect = validateTaskStatus(newTask);
          if (!validateIfStatusTaskIsCorrect) {
            throw new HttpException(
              'TaskStatus no permitido ',
              HttpStatus.BAD_REQUEST,
            );
          }
          // update kanban
          await this.TaskKanban.findOneAndUpdate({ commonId, client }, newTask);

          const filterPropertiesToUpdateToDo =
            filterPropiertiesForToDo(newTask);
          return await this.TodoTask.findOneAndUpdate(
            { commonId, client },
            filterPropertiesToUpdateToDo,
          );
        } catch (error) {
          throw error;
        }
      });
      await Promise.all(updateTasks);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'actualizado correctamente' });
    } catch (error) {
      return new HttpException(`error ${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteTask(tasksIds: DeleteJoinTaskAndKanbanTdo[], @Res() res: any) {
    try {
      const deleteTasks = tasksIds.map(async (taskId) => {
        try {
          const { client, commonId } = taskId;
          await this.TodoTask.deleteOne({ commonId, client });
          await this.TaskKanban.deleteOne({
            commonId,
            client,
          });
        } catch (error) {
          throw error;
        }
      });
      await Promise.all(deleteTasks);
      return res.status(HttpStatus.OK).json({ message: 'proceso exitoso' });
    } catch (error) {
      console.log(error);
      return new HttpException(`error ${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
