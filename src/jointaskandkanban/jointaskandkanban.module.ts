import { Module } from '@nestjs/common';
import { JointaskandkanbanService } from './jointaskandkanban.service';
import { JointaskandkanbanController } from './jointaskandkanban.controller';

@Module({
  providers: [JointaskandkanbanService],
  controllers: [JointaskandkanbanController],
})
export class JointaskandkanbanModule {}
