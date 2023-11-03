import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class DeleteJoinTaskAndKanbanTdo {
  // @IsString()
  // @IsNotEmpty()
  // id: string;

  @IsString()
  @IsNotEmpty()
  client: string;

  @IsOptional()
  @IsString()
  commonId: string;
}
