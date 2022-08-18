import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AchievementService } from 'src/services/achievement/achievement.service';
import {
  CreateAchievementRequestDto,
  CreateAchievementResponseDto,
} from 'src/services/achievement/dto/create-achievement.dto';
import { GetAchievementResponseDto } from 'src/services/achievement/dto/get-achievement.dto';
import { UpdateAchievementRequestDto } from 'src/services/achievement/dto/update-achievement.dto';

@Controller('auth/user')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Post(':userId/achievement')
  @UseGuards(JwtAuthGuard)
  createAchievement(
    @Param('userId') userId: number,
    @Body() newAchievement: CreateAchievementRequestDto,
  ): Promise<CreateAchievementResponseDto> {
    return this.achievementService.createAchievement(userId, newAchievement);
  }

  @Get(':userId/achievement/:achievement_id')
  @UseGuards(JwtAuthGuard)
  getAchievement(
    @Param('userId') userId: number,
    @Param('achievement_id') _id: number,
  ): Promise<GetAchievementResponseDto> {
    return this.achievementService.getAchievement(userId, _id);
  }

  @Patch()
  update(
    @Body() updateAchievementRequestDto: UpdateAchievementRequestDto,
  ): Promise<void> {
    return this.achievementService.update(updateAchievementRequestDto);
  }

  @Delete()
  delete(@Body() _id: number): Promise<void> {
    return this.achievementService.delete(_id);
  }
}
