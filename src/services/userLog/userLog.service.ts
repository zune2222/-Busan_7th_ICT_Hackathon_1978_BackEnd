import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLog } from 'src/entities/userLog.entity';
import { Repository } from 'typeorm';
import {
  CreateUserLogRequestDto,
  CreateUserLogResponseDto,
} from './dto/create-userlog.dto';
import { GetUserLogResponseDto } from './dto/get-userlog.dto';
import { UpdateUserLogRequestDto } from './dto/update-userlog.dto';

@Injectable()
export class UserLogService {
  constructor(
    @InjectRepository(UserLog)
    private userLogRepository: Repository<UserLog>,
  ) {}

  async create(
    newUserLog: CreateUserLogRequestDto,
  ): Promise<CreateUserLogResponseDto> {
    const isExist = await this.userLogRepository.findOneBy({
      userId: newUserLog.userId,
    });

    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 만들어져있는 userLog 정보임`],
      });
    }

    return await this.userLogRepository.save(newUserLog);
  }

  async getUserLogByUserId(userId: string): Promise<GetUserLogResponseDto> {
    const isExist = await this.userLogRepository.findOneBy({
      userId: userId,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`그런 userLog 정보는 없음`],
      });
    }

    return isExist;
  }

  async update(updateUserLog: UpdateUserLogRequestDto): Promise<void> {
    const isExist = await this.userLogRepository.findOneBy({
      _id: updateUserLog._id,
    });

    if (!isExist) {
      if (!isExist) {
        throw new ForbiddenException({
          statusCode: HttpStatus.FORBIDDEN,
          message: [`그런 achievement 정보는 없음`],
        });
      }
    }

    await this.userLogRepository.update(
      {
        _id: updateUserLog._id,
      },
      {
        userId: updateUserLog.userId,
        dailyLogId: updateUserLog.dailyLogId,
        startTime: updateUserLog.startTime,
        endTime: updateUserLog.endTime,
        position: updateUserLog.position,
      },
    );
  }

  async delete(_id: number): Promise<void> {
    const isExist = await this.userLogRepository.findOneBy({ _id: _id });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 없어서 못 지움`],
        error: 'Forbidden',
      });
    }

    await this.userLogRepository.delete({ _id: _id });
  }
}
