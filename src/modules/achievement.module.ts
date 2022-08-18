import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementController } from 'src/controllers/achievement.controller';
import { Achievement } from 'src/entities/achievement.entity';
import { AchievementService } from 'src/services/achievement/achievement.service';

@Module({
  imports: [TypeOrmModule.forFeature([Achievement])],
  controllers: [AchievementController],
  providers: [AchievementService],
  exports: [AchievementService],
})
export class AchievementModule {}
