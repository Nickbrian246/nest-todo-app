import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TodoTask } from 'src/schemas/todo.task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateToDoDto,
  DeleteToDoDto,
  FindByClinetToDoDto,
  UpdateToDoDto,
} from './to-do.tdo/to-do';

@Injectable()
export class ToDoTaskService {
  constructor(@InjectModel(TodoTask.name) private TodoTask: Model<TodoTask>) {}

  async getToDo() {
    return await this.TodoTask.find();
  }
  async getToDosByClient(clientData: FindByClinetToDoDto) {
    const { client } = clientData;
    console.log(clientData);

    return await this.TodoTask.find({ client });
  }

  async createToDo(tasks: CreateToDoDto[], res: any) {
    try {
      const createTasks = tasks.map(async (task) => {
        try {
          await this.TodoTask.create(task);
        } catch (error) {
          new HttpException('Error al creat un ToDo', HttpStatus.BAD_REQUEST);
        }
      });
      await Promise.all(createTasks);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Creacion de tareas exitosa' });
    } catch (error) {}
  }

  async updatToDo(newTasks: UpdateToDoDto[], res: any) {
    try {
      const updateTodos = newTasks.map(async (newTask) => {
        try {
          const { id, client } = newTask;

          await this.TodoTask.findByIdAndUpdate({ _id: id, client }, newTask);
        } catch (error) {
          throw error;
        }
      });

      await Promise.all(updateTodos);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Actualizacion exitosa' });
    } catch (error) {
      new HttpException(
        'Error al actualizar las tareas',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteToDo(tasksIds: DeleteToDoDto[], res: any) {
    try {
      const deleteTodos = tasksIds.map(async (taskId) => {
        try {
          const { id, client } = taskId;
          await this.TodoTask.deleteOne({ _id: id, client });
        } catch (error) {
          throw error;
        }
      });
      await Promise.all(deleteTodos);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Se eliminaron las tareas correctamente' });
    } catch (error) {
      new HttpException('Error al eliminar las tareas', HttpStatus.BAD_REQUEST);
    }
  }
}
