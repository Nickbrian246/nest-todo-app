import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    unique: false,
    required: false,
    trim: true,
  })
  description: string;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  taskStatus: string;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  client: string;

  @Prop({ required: false })
  commonId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
