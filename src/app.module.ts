import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TaskModule,
    MongooseModule.forRoot(
      'mongodb://nick1234:NCkWNVinhgNg0tlZ@ac-s72quvt-shard-00-00.iy1wgbo.mongodb.net:27017,ac-s72quvt-shard-00-01.iy1wgbo.mongodb.net:27017,ac-s72quvt-shard-00-02.iy1wgbo.mongodb.net:27017/?ssl=true&replicaSet=atlas-xb24t3-shard-0&authSource=admin&retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
