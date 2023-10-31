import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid';
// aqui es donde crearemos nuestros metodos es como utils
@Injectable()
export class TaskService {
  private task: Task[] = [
    {
      id: '2',
      description: 'hola',
      title: 'hacer tarea',
      status: TaskStatus.PENDING,
    },
  ];

  getTasks() {
    return this.task;
  }

  createTasks(task: Task) {
    return this.task.push({ ...task, id: v4() });
  }

  updateTask(newTask: Task) {
    const { id } = newTask;
    const groupTaskUpdated = this.task.map((task) => {
      if (task.id === id) {
        return newTask;
      } else {
        return newTask;
      }
    });
    this.task = groupTaskUpdated;

    return 'actualizado correctamente';
  }

  deleteTasks(taskId: Task) {
    const { id } = taskId;
    const groupOfTaskWithoutTask = this.task.filter((task) => task.id !== id);
    this.task = groupOfTaskWithoutTask;

    return id;
  }
}
