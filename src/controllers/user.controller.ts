import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from 'src/services/user/dto/create-user.dto';
import { GetByUserIdResponseDto } from 'src/services/user/dto/get-by-userId.dto';
import {
  UpdateRoomRequestDto,
  UpdateRoomResponseDto,
} from 'src/services/user/dto/update-room.dto';
import { UserService } from '../services/user/user.service';

@Controller('/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  create(@Body() body: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return this.userService.create(body);
  }

  @Put('auth/user/:userId/room')
  @UseGuards(JwtAuthGuard)
  updateRoom(
    @Param() userId: number,
    @Body() body: UpdateRoomRequestDto,
  ): Promise<UpdateRoomResponseDto> {
    return this.userService.updateRoom(userId, body);
  }

  @Put('auth/user/:userId/visible')
  @UseGuards(JwtAuthGuard)
  toggleVisible(@Param('userId') userId: number): Promise<void> {
    return this.userService.toggleVisible(userId);
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  getByUserId(
    @Param('userId') userId: number,
  ): Promise<GetByUserIdResponseDto> {
    return this.userService.getByUserId(userId);
  }
}
