import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user.module';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Calender } from './entities/calendar.entity';
import { CalendarModule } from './modules/calendar.module';
import { DailyLogModule } from './modules/dailyLog.module';
import { DailyLog } from './entities/dailyLog.entity';
import { AchievementModule } from './modules/achievement.module';
import { Achievement } from './entities/achievement.entity';
import { UserLog } from './entities/userLog.entity';
import { UserLogModule } from './modules/userLog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Calender, DailyLog, Achievement, UserLog],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CalendarModule,
    DailyLogModule,
    AchievementModule,
    UserLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
