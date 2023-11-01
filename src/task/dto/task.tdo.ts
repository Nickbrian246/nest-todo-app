import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
export type taskStatus = 'NO_STATUS' | 'PENDING' | 'PROGRESS' | 'DONE';
export class Task {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  taskStatus: taskStatus;

  @IsNotEmpty()
  @IsString()
  client: string;
}
export class UpdateTask {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  taskStatus: taskStatus;

  @IsString()
  client: string;

  @IsString()
  id: string;
}

export class CreateTask {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  taskStatus: taskStatus;

  @IsNotEmpty()
  @IsString()
  client: string;
}
export class DeleteTask {
  @IsString()
  id: string;
  @IsString()
  client: string;
}
