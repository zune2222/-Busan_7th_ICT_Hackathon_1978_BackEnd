import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AchievementService } from 'src/services/achievement/achievement.service';
import {
  CreateAchievementRequestDto,
  CreateAchievementResponseDto,
} from 'src/services/achievement/dto/create-achievement.dto';
import { GetAchievementResponseDto } from 'src/services/achievement/dto/get-achievement.dto';
import { UpdateAchievementRequestDto } from 'src/services/achievement/dto/update-achievement.dto';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Post()
  create(
    @Body() createAchievementRequestDto: CreateAchievementRequestDto,
  ): Promise<CreateAchievementResponseDto> {
    return this.achievementService.create(createAchievementRequestDto);
  }

  @Get(':dailyLogId/:title')
  getAchievement(
    @Param('dailyLogId') dailyLogId: string,
    @Param('title') title: string,
  ): Promise<GetAchievementResponseDto> {
    return this.achievementService.getAchievement(dailyLogId, title);
  }

  @Patch()
  update(
    @Body() updateAchievementRequestDto: UpdateAchievementRequestDto,
  ): Promise<void> {
    return this.achievementService.update(updateAchievementRequestDto);
  }

  @Delete()
  delete(@Body() id: number): Promise<void> {
    return this.achievementService.delete(id);
  }
}
