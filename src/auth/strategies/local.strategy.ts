import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'id' });
  }

  async validate(id: string, password: string): Promise<any> {
    const loginUserDto: LoginUserDto = {
      id: id,
      password: password,
    };

    const user = await this.authService.validateUser(loginUserDto);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
