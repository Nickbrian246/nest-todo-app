import { IsString, IsNotEmpty } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
