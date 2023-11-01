import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
export class CreateToDoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  isDone: boolean;

  @IsString()
  @IsNotEmpty()
  client: string;
}

export class UpdateToDoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsNotEmpty()
  isDone: boolean;

  @IsString()
  @IsNotEmpty()
  client: string;

  @IsString()
  @IsNotEmpty()
  id: string;
}

export class DeleteToDoDto {
  @IsString()
  @IsNotEmpty()
  client: string;

  @IsString()
  @IsNotEmpty()
  id: string;
}
export class FindByClinetToDoDto {
  client: string;
}
