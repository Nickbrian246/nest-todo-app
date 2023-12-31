import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto-for-auth/dto.for.create.user';
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser);
  }
}
