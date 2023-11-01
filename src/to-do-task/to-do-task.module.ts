import { Module } from '@nestjs/common';
import { ToDoTaskService } from './to-do-task.service';
import { ToDoTaskController } from './to-do-task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoTask, TodoTaskSchema } from 'src/schemas/todo.task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TodoTask.name, schema: TodoTaskSchema },
    ]),
  ],
  providers: [ToDoTaskService],
  controllers: [ToDoTaskController],
})
export class ToDoTaskModule {}
