import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signIn')
  @UseGuards(LocalAuthGuard)
  async login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }
}
