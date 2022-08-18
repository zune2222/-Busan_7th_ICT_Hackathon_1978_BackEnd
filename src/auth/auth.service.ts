import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findOneBy({
      loginId: loginUserDto.id,
    });

    if (!user) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`등록되지 않은 사용자입니다.`],
        error: 'Forbidden',
      });
    }

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);

    if (isMatch) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`사용자 정보가 일치하지 않습니다.`],
        error: 'Forbidden',
      });
    }
  }

  async login(user: LoginUserDto) {
    const payload = {
      loginId: user.id,
    };

    return {
      accessToken: 'Bearer ' + this.jwtService.sign(payload),
    };
  }
}
