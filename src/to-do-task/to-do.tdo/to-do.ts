import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
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

  @IsOptional()
  @IsString()
  commonId: string;
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

  @IsOptional()
  @IsString()
  commonId: string;
}

export class DeleteToDoDto {
  @IsString()
  @IsNotEmpty()
  client: string;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  commonId: string;
}
export class FindByClinetToDoDto {
  client: string;
}
