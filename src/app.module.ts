import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDoTaskModule } from './to-do-task/to-do-task.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TaskModule,
    MongooseModule.forRoot(`${process.env.DB_URI}`),
    ToDoTaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
