import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GetByUserIdResponseDto } from './dto/get-by-userId.dto';
import { GetAllResponseDto } from './dto/get-all.dto';
import { CreateUserResponseDto } from './dto/create-user.dto';

class CreateUserDto {
  id: string;
  password: string;
  job: number;
  major: number;
  gender: number;
  birthDay: Date;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(newUser: CreateUserDto): Promise<CreateUserResponseDto> {
    const isExist = await this.userRepository.findOneBy({
      id: newUser.id,
    });
    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 등록된 사용자입니다.`],
        error: 'Forbidden',
      });
    }

    newUser.password = await bcrypt.hash(newUser.password, 10);
    const result = await this.userRepository.save(newUser);
    return result;
  }

  async getAll(): Promise<GetAllResponseDto> {
    return this.userRepository.find({
      select: ['_id', 'id'],
    });
  }

  async getByUserId(id: string): Promise<GetByUserIdResponseDto> {
    const isExist = await this.userRepository.findOneBy({ id: id });
    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`등록되지 않은 사용자입니다.`],
        error: 'Forbidden',
      });
    }
    const result = await this.userRepository.findOneBy({
      id: id,
    });
    return result;
  }
}
