import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../interfaces';
export class CreateJoinTaskAndKanbanTdo {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsOptional()
  isDone: boolean;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  taskStatus: TaskStatus;

  @IsString()
  @IsNotEmpty()
  client: string;

  @IsOptional()
  @IsString()
  commonId: string;
}
