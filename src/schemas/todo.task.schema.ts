import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<TodoTask>;

@Schema({
  timestamps: true,
})
export class TodoTask {
  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  isDone: boolean;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  client: string;
}

export const TodoTaskSchema = SchemaFactory.createForClass(TodoTask);
