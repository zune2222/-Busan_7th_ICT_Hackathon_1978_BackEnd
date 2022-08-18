import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DailyLogService } from 'src/services/dailyLog/dailyLog.service';
import {
  CreateDailyLogRequestDto,
  CreateDailyLogResponseDto,
} from 'src/services/dailyLog/dto/create-dailyLog.dto';
import { GetDailyLogResponseDto } from 'src/services/dailyLog/dto/get-dailyLog.dto';
import { GetProgressResponseDto } from 'src/services/dailyLog/dto/get-progress.dto';
import { UpdateDailyLogDto } from 'src/services/dailyLog/dto/update-dailyLog.dto';

@Controller('')
export class DailyLogController {
  constructor(private readonly dailyLogService: DailyLogService) {}

  @Post('auth/user/dailyLog')
  create(
    @Body() createDailyLogRequestDto: CreateDailyLogRequestDto,
  ): Promise<CreateDailyLogResponseDto> {
    return this.dailyLogService.create(createDailyLogRequestDto);
  }

  @Get(':userId')
  getProgress(
    @Param('userId') userId: number,
  ): Promise<GetProgressResponseDto> {
    return this.dailyLogService.getProgress(userId);
  }

  @Get('auth/user/:userId/dailyLog')
  @UseGuards(JwtAuthGuard)
  getDailyLog(
    @Param('userId') userId: number,
    @Query('date') query: Date,
  ): Promise<GetDailyLogResponseDto> {
    return this.dailyLogService.getDailyLog(userId, query);
  }
  // @Patch()
  // update(@Body() updateDailyLogDto: UpdateDailyLogDto): Promise<void> {
  //   return this.dailyLogService.update(updateDailyLogDto);
  // }

  // @Delete(':id')
  // delete(@Param('id') id: number): Promise<void> {
  //   return this.dailyLogService.delete(id);
  // }
}
