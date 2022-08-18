import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyLogController } from 'src/controllers/dailyLog.controller';
import { Achievement } from 'src/entities/achievement.entity';
import { DailyLog } from 'src/entities/dailyLog.entity';
import { DailyLogService } from 'src/services/dailyLog/dailyLog.service';

@Module({
  imports: [TypeOrmModule.forFeature([DailyLog, Achievement])],
  controllers: [DailyLogController],
  providers: [DailyLogService],
  exports: [DailyLogService],
})
export class DailyLogModule {}
