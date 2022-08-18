import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateUserLogRequestDto,
  CreateUserLogResponseDto,
} from 'src/services/userLog/dto/create-userlog.dto';
import { GetUserLogResponseDto } from 'src/services/userLog/dto/get-userlog.dto';
import { UpdateUserLogRequestDto } from 'src/services/userLog/dto/update-userlog.dto';
import { UserLogService } from 'src/services/userLog/userLog.service';

@Controller('userLog')
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) {}

  @Post()
  create(
    @Body() body: CreateUserLogRequestDto,
  ): Promise<CreateUserLogResponseDto> {
    return this.userLogService.create(body);
  }

  @Get(':userId')
  getUserLogByUserId(
    @Param('userId') userId: string,
  ): Promise<GetUserLogResponseDto> {
    return this.userLogService.getUserLogByUserId(userId);
  }

  @Patch()
  update(@Body() body: UpdateUserLogRequestDto): Promise<void> {
    return this.userLogService.update(body);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.userLogService.delete(id);
  }
}
