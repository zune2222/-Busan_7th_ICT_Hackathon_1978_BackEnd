import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GetByUserIdResponseDto } from './dto/get-by-userId.dto';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from './dto/create-user.dto';
import { UpdateRoomRequestDto } from './dto/update-room.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(newUser: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const isExist = await this.userRepository.findOneBy({
      loginId: newUser.id,
    });
    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 등록된 사용자입니다.`],
        error: 'Forbidden',
      });
    }

    newUser.password = await bcrypt.hash(newUser.password, 10);
    const { password, ...result } = await this.userRepository.save({
      ...newUser,
      visible: true,
    });
    return result;
  }

  async toggleVisible(userId: number): Promise<void> {
    const isExist = await this.userRepository.findOneBy({
      _id: userId,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`그런 사용자는 존재하지 않는다.`],
        error: 'Forbidden',
      });
    }

    await this.userRepository.update(
      { _id: userId },
      { visible: !isExist.visible },
    );
  }

  async getByUserId(userId: number): Promise<GetByUserIdResponseDto> {
    const isExist = await this.userRepository.findOneBy({ userId: userId });
    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`등록되지 않은 사용자입니다.`],
        error: 'Forbidden',
      });
    }
    const result = await this.userRepository.findOneBy({
      userId: userId,
    });
    return result;
  }

  async updateRoom(
    userId: number,
    newRoom: UpdateRoomRequestDto,
  ): Promise<void> {
    const isExist = this.userRepository.findOneBy({
      _id: userId,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`니가 찾는 그 유저의 room 정보는 존재하지 않음.`],
        error: 'Forbidden',
      });
    }

    await this.userRepository.update(
      {
        _id: userId,
      },
      {
        room: JSON.stringify(newRoom.room),
      },
    );
  }

  async nagging(userId: number, dailyLogId: number): Promise<string> {
    return '집 가고싶다';
  }
}
