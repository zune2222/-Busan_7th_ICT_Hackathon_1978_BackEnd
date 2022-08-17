import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DailyLogService } from 'src/services/dailyLog/dailyLog.service';
import {
  CreateDailyLogRequestDto,
  CreateDailyLogResponseDto,
} from 'src/services/dailyLog/dto/create-dailyLog.dto';
import { GetProgressResponseDto } from 'src/services/dailyLog/dto/get-progress.dto';
import { UpdateDailyLogDto } from 'src/services/dailyLog/dto/update-dailyLog.dto';

@Controller('dailyLog')
export class DailyLogController {
  constructor(private readonly dailyLogService: DailyLogService) {}

  @Post()
  create(
    @Body() createDailyLogRequestDto: CreateDailyLogRequestDto,
  ): Promise<CreateDailyLogResponseDto> {
    return this.dailyLogService.create(createDailyLogRequestDto);
  }

  @Get(':userId')
  getProgress(
    @Param('userId') userId: string,
  ): Promise<GetProgressResponseDto> {
    return this.dailyLogService.getProgress(userId);
  }

  @Patch()
  update(@Body() updateDailyLogDto: UpdateDailyLogDto): Promise<void> {
    return this.dailyLogService.update(updateDailyLogDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.dailyLogService.delete(id);
  }
}
