import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyLog } from 'src/entities/dailyLog.entity';
import { Repository } from 'typeorm';
import {
  CreateDailyLogRequestDto,
  CreateDailyLogResponseDto,
} from './dto/create-dailyLog.dto';
import { GetDailyLogResponseDto } from './dto/get-dailyLog.dto';
import { GetProgressResponseDto } from './dto/get-progress.dto';
import { UpdateDailyLogDto } from './dto/update-dailyLog.dto';

@Injectable()
export class DailyLogService {
  constructor(
    @InjectRepository(DailyLog)
    private dailyLogRepository: Repository<DailyLog>,
  ) {}

  async create(
    createDailyLogRequestDto: CreateDailyLogRequestDto,
  ): Promise<CreateDailyLogResponseDto> {
    const isExist = await this.dailyLogRepository.findOneBy({
      userId: createDailyLogRequestDto.userId,
      calendarId: createDailyLogRequestDto.calendarId,
      date: createDailyLogRequestDto.date,
    });

    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 만들어져있는 진행도임`],
        error: 'Forbidden',
      });
    }

    return await this.dailyLogRepository.save(createDailyLogRequestDto);
  }

  async getProgress(userId: number): Promise<GetProgressResponseDto> {
    const isExist = await this.dailyLogRepository.findBy({
      userId: userId,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`그런 진행도는 없음`],
        error: 'Forbidden',
      });
    }

    return isExist;
  }

  async getDailyLog(
    userId: number,
    date: Date,
  ): Promise<GetDailyLogResponseDto> {
    const isExist = await this.dailyLogRepository.findOneBy({
      userId: userId,
      date: date,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`그런 dailyLog는 존재하지 않음`],
        error: 'Forbidden',
      });
    }

    return isExist;
  }

  async update(updateDailyLogDto: UpdateDailyLogDto): Promise<void> {
    const isExist = await this.dailyLogRepository.findOneBy({
      userId: updateDailyLogDto.userId,
      calendarId: updateDailyLogDto.calendarId,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`업데이트 할 진행도가 없음`],
        error: 'Forbidden',
      });
    }

    await this.dailyLogRepository.update(
      {
        userId: updateDailyLogDto.userId,
        calendarId: updateDailyLogDto.calendarId,
      },
      { progress: updateDailyLogDto.progress },
    );
  }

  async delete(id: number): Promise<void> {
    const isExist = await this.dailyLogRepository.findOneBy({ _id: id });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 없어서 못 지움`],
        error: 'Forbidden',
      });
    }
    await this.dailyLogRepository.delete({ _id: id });
  }
}
