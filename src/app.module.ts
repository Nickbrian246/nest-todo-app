import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDoTaskModule } from './to-do-task/to-do-task.module';
import { ConfigModule } from '@nestjs/config';
import { JointaskandkanbanModule } from './jointaskandkanban/jointaskandkanban.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TaskModule,
    MongooseModule.forRoot(`${process.env.DB_URI}`),
    ToDoTaskModule,
    JointaskandkanbanModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
