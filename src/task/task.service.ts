import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task as TaskSchema } from 'src/schemas/task.schema';
import { CreateTask, DeleteTask, UpdateTask, GetTaskByClient } from './dto';
// aqui es donde crearemos nuestros metodos es como utils
// aqui es donde se usan  los tdo
@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskSchema.name) private TaskModel: Model<TaskSchema>,
  ) {}

  async getTasks() {
    try {
      return await this.TaskModel.find();
    } catch (error) {
      new HttpException('Error al obtener las tareas', HttpStatus.BAD_REQUEST);
    }
  }
  async getTaskByClient(clientId: GetTaskByClient) {
    try {
      const { client } = clientId;
      return await this.TaskModel.find({ client });
    } catch (error) {
      new HttpException('Error al crear una tarea', HttpStatus.BAD_REQUEST);
    }
  }

  async createTasks(tasks: CreateTask[], res: any) {
    try {
      const createTasks = tasks.map(async (task) => {
        try {
          await this.TaskModel.create(task);
        } catch (error) {
          throw error;
        }
      });
      await Promise.all(createTasks);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Tareas creadas exitosamente' });
    } catch (error) {
      new HttpException('Error al crear una tarea', HttpStatus.BAD_REQUEST);
    }
  }

  async updateTask(newTasks: UpdateTask[], res: any) {
    try {
      const updateTasks = newTasks.map(async (newTask) => {
        try {
          const { id, client } = newTask;
          await this.TaskModel.findByIdAndUpdate({ _id: id, client }, newTask);
        } catch (error) {
          throw error;
        }
      });
      await Promise.all(updateTasks);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Tareas actualizadas correctente' });
    } catch (error) {
      new HttpException(
        'error al actualizar las tareas',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteTasks(tasksIds: DeleteTask[], res: any) {
    try {
      const deleteTasks = tasksIds.map(async (taskId) => {
        try {
          const { id, client } = taskId;
          const taskDelete = await this.TaskModel.deleteOne({
            _id: id,
            client,
          });

          return taskDelete;
        } catch (error) {
          throw error;
        }
      });
      await Promise.all(deleteTasks);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Tareas eliminadas correctamente' });
    } catch (error) {
      new HttpException('error al eliminar tareas', HttpStatus.BAD_REQUEST);
    }
  }
}
