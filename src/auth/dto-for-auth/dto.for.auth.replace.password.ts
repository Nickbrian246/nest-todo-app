import { IsString, IsNotEmpty } from 'class-validator';

export class ReplacePasswordDto {
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
