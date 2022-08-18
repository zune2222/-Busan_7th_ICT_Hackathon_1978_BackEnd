import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogController } from 'src/controllers/userLog.controller';
import { UserLog } from 'src/entities/userLog.entity';
import { UserLogService } from 'src/services/userLog/userLog.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserLog])],
  controllers: [UserLogController],
  providers: [UserLogService],
  exports: [UserLogService],
})
export class UserLogModule {}
