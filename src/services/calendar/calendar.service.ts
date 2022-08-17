import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calender } from 'src/entities/calendar.entity';
import { Repository } from 'typeorm';
import {
  CreateCalendarRequestDto,
  CreateCalendarResponseDto,
} from './dto/create-calendar.dto';
import { GetCalendarAllResponseDto } from './dto/get-all';
import { UpdateCalendarRequestDto } from './dto/update-calendar.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calender)
    private calendarRepository: Repository<Calender>,
  ) {}

  async create(
    createCalendarRequestDto: CreateCalendarRequestDto,
  ): Promise<CreateCalendarResponseDto> {
    const isExist = await this.calendarRepository.findOneBy({
      userId: createCalendarRequestDto.userId,
      month: createCalendarRequestDto.month,
    });

    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`해당 아이디에 캘린더 정보가 이미 존재함.`],
        error: 'Forbidden',
      });
    }

    return await this.calendarRepository.save(createCalendarRequestDto);
  }

  async getByUserId(userId: string): Promise<GetCalendarAllResponseDto> {
    const isExist = await this.calendarRepository.findBy({
      userId: userId,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`해당 아이디에 캘린더 정보가 없음.`],
        error: 'Forbidden',
      });
    }

    return await this.calendarRepository.findBy({ userId: userId });
  }

  async update(
    userId: string,
    updateCalendarRequestDto: UpdateCalendarRequestDto,
  ): Promise<void> {
    const isExist = await this.calendarRepository.findOneBy({
      userId: userId,
      month: updateCalendarRequestDto.month,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`해당 아이디에 대한 정보가 없음.`],
        error: 'Forbidden',
      });
    }

    const { month, like } = updateCalendarRequestDto;
    await this.calendarRepository.update(
      { userId: userId },
      { month: month, like: like },
    );
  }

  async delete(userId: string): Promise<void> {
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
