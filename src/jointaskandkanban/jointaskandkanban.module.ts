import { Module } from '@nestjs/common';
import { JointaskandkanbanService } from './jointaskandkanban.service';
import { JointaskandkanbanController } from './jointaskandkanban.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/schemas/task.schema';
import { TodoTask, TodoTaskSchema } from 'src/schemas/todo.task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: TodoTask.name, schema: TodoTaskSchema },
    ]),
  ],
  providers: [JointaskandkanbanService],
  controllers: [JointaskandkanbanController],
})
export class JointaskandkanbanModule {}
