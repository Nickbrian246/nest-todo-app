import { IsNotEmpty, IsString } from 'class-validator';

export class JwtDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  client: string;
}
