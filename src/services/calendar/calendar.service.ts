import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calender } from 'src/entities/calendar.entity';
import { DailyLog } from 'src/entities/dailyLog.entity';
import { Like } from 'src/entities/like.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { GetCommunityResponseDto } from '../user/dto/get-community.dto';
import {
  CreateCalendarRequestDto,
  CreateCalendarResponseDto,
} from './dto/create-calendar.dto';
import { GetCalendarResponseDto } from './dto/get-calendar.dto';
import { UpdateCalendarRequestDto } from './dto/update-calendar.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calender)
    private calendarRepository: Repository<Calender>,
    @InjectRepository(DailyLog)
    private dailyLogRepository: Repository<DailyLog>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Like)
    private likeRespository: Repository<Like>,
  ) {}

  async create(
    newCalender: CreateCalendarRequestDto,
  ): Promise<CreateCalendarResponseDto> {
    const isExist = await this.calendarRepository.findOneBy({
      userId: newCalender.userId,
      month: newCalender.month,
    });

    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`해당 아이디에 캘린더 정보가 이미 존재함.`],
        error: 'Forbidden',
      });
    }

    return await this.calendarRepository.save(newCalender);
  }

  async getCalendar(
    userId: number,
    month: number,
  ): Promise<GetCalendarResponseDto> {
    const isExist = await this.calendarRepository.findOneBy({
      userId: userId,
      month: month,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`해당 캘린더 정보가 존재하지 않음`],
        error: 'Forbidden',
      });
    }

    const dailyLogs = await this.dailyLogRepository.findBy({
      calendarId: isExist._id,
    });

    const dailyLogIds = dailyLogs.map((dailyLog) => dailyLog._id);

    return { dailyLogIds, ...isExist };
  }

  async clickLike(_id: number, userId: number): Promise<void> {
    const isExist = await this.calendarRepository.findOneBy({
      _id: _id,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`해당 캘린더 정보가 존재하지 않음`],
        error: 'Forbidden',
      });
    }

    const isLike = await this.likeRespository.findOneBy({
      userId: userId,
      calendarId: isExist._id,
    });

    if (isLike) {
      await this.calendarRepository.update(
        { _id: isExist._id },
        { like: isExist.like - 1 },
      );
      await this.likeRespository.delete({ _id: isLike._id });
    } else {
      await this.calendarRepository.update(
        { _id: isExist._id },
        { like: isExist.like + 1 },
      );
      await this.likeRespository.create({
        userId: userId,
        calendarId: isExist._id,
      });
    }
  }

  async update(
    userId: number,
    updateCalendar: UpdateCalendarRequestDto,
  ): Promise<void> {
    const isExist = await this.calendarRepository.findOneBy({
      userId: userId,
      month: updateCalendar.month,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`해당 아이디에 대한 정보가 없음.`],
        error: 'Forbidden',
      });
    }

    const { month, like } = updateCalendar;
    await this.calendarRepository.update(
      { userId: userId },
      { month: month, like: like },
    );
  }

  async delete(userId: number): Promise<void> {
    const isExist = await this.calendarRepository.findBy({ userId: userId });
    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`해당 아이디에 해당 월의 정보가 없음.`],
        error: 'Forbidden',
      });
    }

    await this.calendarRepository.delete({ userId: userId });
  }

  async getCommunity(job: number): Promise<GetCommunityResponseDto> {
    const users = await this.userRepository.findBy({ job: job });
    const today = new Date();
    const calendars = [];
    users.forEach(async (user) => {
      const calendar = await this.calendarRepository.findOneBy({
        userId: user._id,
        month: today.getMonth() + 1,
      });
      calendars.push(calendar);
    });
    return calendars;
  }
}
