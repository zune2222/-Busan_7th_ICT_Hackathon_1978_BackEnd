import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CalendarService } from 'src/services/calendar/calendar.service';
import {
  CreateCalendarRequestDto,
  CreateCalendarResponseDto,
} from 'src/services/calendar/dto/create-calendar.dto';
import { GetCalendarAllResponseDto } from 'src/services/calendar/dto/get-all';
import { GetCalendarResponseDto } from 'src/services/calendar/dto/get-calendar.dto';
import { UpdateCalendarRequestDto } from 'src/services/calendar/dto/update-calendar.dto';

@Controller('/')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post('auth/user')
  create(
    @Body() body: CreateCalendarRequestDto,
  ): Promise<CreateCalendarResponseDto> {
    return this.calendarService.create(body);
  }

  @Get('auth/user/:userId/calendar/:month')
  @UseGuards(JwtAuthGuard)
  getCalendar(
    @Param('userId') userId: number,
    @Param('month') month: number,
  ): Promise<GetCalendarResponseDto> {
    return this.calendarService.getCalendar(userId, month);
  }

  @Put('auth/calendar/:calendar_id/like')
  @UseGuards(JwtAuthGuard)
  clickLike(
    @Param('calendar_id') _id: number,
    @Body() body: number,
  ): Promise<void> {
    return this.calendarService.clickLike(_id, body);
  }

  @Patch('auth/user/:userId')
  update(
    @Param('userId') userId: number,
    @Body() body: UpdateCalendarRequestDto,
  ): Promise<void> {
    return this.calendarService.update(userId, body);
  }

  @Delete('auth/user/:userId')
  delete(@Param('userId') userId: number): Promise<void> {
    return this.calendarService.delete(userId);
  }
}
