import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateJoinTaskAndKanbanTdo {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isDone: boolean;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  taskStatus: string;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  client: string;
}
