import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../interfaces';
// para todo solo puedo actualizar el isDone y el title
// para kanban puedo actualizar todo el objeto o  solo uno claro que no vendria el la propiedad IsDOne
export class UpdateJoinTaskAndKanbanTdo {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isDone: boolean;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  taskStatus: TaskStatus;

  @IsOptional()
  @IsString()
  commonId: string;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  client: string;
}
