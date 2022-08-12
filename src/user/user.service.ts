import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const isExist = await this.userRepository.findOneBy({
      userId: createUserDto.userId,
    });
    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 등록된 사용자입니다.`],
        error: 'Forbidden',
      });
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const { password, ...result } = await this.userRepository.save(
      createUserDto,
    );
    return result;
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['seq', 'userId', 'userName', 'role'],
    });
  }

  async getByUserId(id: string): Promise<any> {
    const isExist = await await this.userRepository.findOneBy({ userId: id });
    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`등록되지 않은 사용자입니다.`],
        error: 'Forbidden',
      });
    }
    const { password, ...result } = await this.userRepository.findOneBy({
      userId: id,
    });
    return result;
  }
}
