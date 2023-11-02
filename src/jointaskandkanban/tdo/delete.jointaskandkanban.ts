import { IsNotEmpty, IsString } from 'class-validator';
export class DeleteJoinTaskAndKanbanTdo {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  client: string;
}
