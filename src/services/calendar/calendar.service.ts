import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calender } from 'src/entities/calendar.entity';
import { Repository } from 'typeorm';
import {
  CreateCalendarRequestDto,
  CreateCalendarResponseDto,
} from './dto/create-calendar.dto';
import { GetCalendarAllResponseDto } from './dto/get-all';
import { GetCalendarResponseDto } from './dto/get-calendar.dto';
import { UpdateCalendarRequestDto } from './dto/update-calendar.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calender)
    private calendarRepository: Repository<Calender>,
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

    return isExist;
  }

  async clickLike(_id: number, userId: number): Promise<void> {
    const isExist = this.calendarRepository.findOneBy({
      _id: _id,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`해당 캘린더 정보가 존재하지 않음`],
        error: 'Forbidden',
      });
    }

    await this.calendarRepository.update(
      { _id: _id },
      { like: (await isExist).like + 1 },
    );
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
}
