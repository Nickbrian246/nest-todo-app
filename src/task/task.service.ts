import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task as TaskSchema } from 'src/schemas/task.schema';
import { CreateTask, DeleteTask, UpdateTask } from './dto';
// aqui es donde crearemos nuestros metodos es como utils
// aqui es donde se usan  los tdo
@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskSchema.name) private TaskModel: Model<TaskSchema>,
  ) {}

  async getTasks() {
    return await this.TaskModel.find();
  }
  async getTaskByClient(clientId: any) {
    const { id } = clientId;
    return await this.TaskModel.find({ client: id });
  }

  async createTasks(task: CreateTask) {
    return await this.TaskModel.create(task);
  }

  async updateTask(newTask: UpdateTask) {
    const { id, client } = newTask;
    const task = await this.TaskModel.findByIdAndUpdate(
      { _id: id, client },
      newTask,
    );

    return task;
  }

  async deleteTasks(taskId: DeleteTask) {
    const { id, client } = taskId;
    const taskDelete = await this.TaskModel.deleteOne({ _id: id, client });

    return taskDelete;
  }
}
