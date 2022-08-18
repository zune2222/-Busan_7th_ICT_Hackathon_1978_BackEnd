import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarController } from 'src/controllers/calendar.controller';
import { Calender } from 'src/entities/calendar.entity';
import { DailyLog } from 'src/entities/dailyLog.entity';
import { Like } from 'src/entities/like.entity';
import { User } from 'src/entities/user.entity';
import { CalendarService } from 'src/services/calendar/calendar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Calender, DailyLog, User, Like])],
  controllers: [CalendarController],
  providers: [CalendarService],
  exports: [CalendarService],
})
export class CalendarModule {}
