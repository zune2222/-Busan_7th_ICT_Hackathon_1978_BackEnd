import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarController } from 'src/controllers/calendar.controller';
import { Calender } from 'src/entities/calendar.entity';
import { CalendarService } from 'src/services/calendar/calendar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Calender])],
  controllers: [CalendarController],
  providers: [CalendarService],
  exports: [CalendarService],
})
export class CalendarModule {}
