import { Injectable } from '@nestjs/common';
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

  async createToDo(task: CreateToDoDto) {
    return await this.TodoTask.create(task);
  }

  async updatToDo(newTask: UpdateToDoDto) {
    const { id, client } = newTask;
    const task = await this.TodoTask.findByIdAndUpdate(
      { _id: id, client },
      newTask,
    );

    return task;
  }

  async deleteToDo(taskId: DeleteToDoDto) {
    const { id, client } = taskId;
    const taskDelete = await this.TodoTask.deleteOne({ _id: id, client });

    return taskDelete;
  }
}
