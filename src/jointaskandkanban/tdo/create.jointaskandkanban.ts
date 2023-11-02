import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateJoinTaskAndKanbanTdo {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  isDone: boolean;
  @IsString()
  @IsNotEmpty()
  taskStatus: string;

  @IsString()
  @IsNotEmpty()
  client: string;
}
