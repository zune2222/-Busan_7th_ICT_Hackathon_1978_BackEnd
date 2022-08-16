import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calender } from 'src/entities/calendar.entity';
import { Repository } from 'typeorm';
import { CreateCalendarRequestDto } from './dto/create-calendar.dto';
import { GetCalendarByUserIdResponseDto } from './dto/get-calendar-by-userId.dto';
import { UpdateCalendarRequestDto } from './dto/update-calendar.dto';

class CreateCalendarDto {
  userId: string;
  month: Number;
  like: Number;
}

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calender)
    private calendarRepository: Repository<Calender>,
  ) {}

  async create(
    createCalendarDto: CreateCalendarDto,
  ): Promise<CreateCalendarRequestDto> {
    const isExist = await this.calendarRepository.findOneBy({
      userId: createCalendarDto.userId,
    });
    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`해당 아이디에 대한 정보가 이미 존재함.`],
        error: 'Forbidden',
      });
    }

    const result = await this.calendarRepository.save(createCalendarDto);
    return result;
  }

  async getByUserId(userId: string): Promise<GetCalendarByUserIdResponseDto> {
    const isExist = await this.calendarRepository.findOneBy({
      userId: userId,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`해당 아이디에 대한 정보가 없음.`],
        error: 'Forbidden',
      });
    }

    const result = await this.calendarRepository.findOneBy({
      userId: userId,
    });
    return result;
  }

  async update(
    userId: string,
    updateCalendarRequestDto: UpdateCalendarRequestDto,
  ): Promise<void> {
    const isExist = await this.calendarRepository.findOneBy({ userId: userId });
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
    const isExist = await this.calendarRepository.findOneBy({ userId: userId });
    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`해당 아이디에 대한 정보가 없음.`],
        error: 'Forbidden',
      });
    }

    await this.calendarRepository.delete({ userId: userId });
  }
}
