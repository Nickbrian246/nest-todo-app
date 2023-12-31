import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  client: string;

  @IsString()
  @IsOptional()
  commonId: string;
}
