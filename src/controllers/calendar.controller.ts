import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { CalendarService } from 'src/services/calendar/calendar.service';
import {
  CreateCalendarRequestDto,
  CreateCalendarResponseDto,
} from 'src/services/calendar/dto/create-calendar.dto';
import { GetCalendarByUserIdResponseDto } from 'src/services/calendar/dto/get-calendar-by-userId.dto';
import { UpdateCalendarRequestDto } from 'src/services/calendar/dto/update-calendar.dto';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  create(
    @Body() createCalendarRequestDto: CreateCalendarRequestDto,
  ): Promise<CreateCalendarResponseDto> {
    return this.calendarService.create(createCalendarRequestDto);
  }

  @Get(':userId')
  getByUserId(
    @Param('userId') userId: string,
  ): Promise<GetCalendarByUserIdResponseDto> {
    return this.calendarService.getByUserId(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateCalendarRequestDto: UpdateCalendarRequestDto,
  ): Promise<void> {
    return this.calendarService.update(userId, updateCalendarRequestDto);
  }

  @Delete(':userId')
  delete(@Param('userId') userId: string): Promise<void> {
    return this.calendarService.delete(userId);
  }
}
