import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from 'src/services/user/dto/create-user.dto';
import { GetAllResponseDto } from 'src/services/user/dto/get-all.dto';
import { GetByUserIdResponseDto } from 'src/services/user/dto/get-by-userId.dto';
import { UserService } from '../services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    return this.userService.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(): Promise<GetAllResponseDto> {
    return this.userService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getByUserId(@Param('id') id: string): Promise<GetByUserIdResponseDto> {
    return this.userService.getByUserId(id);
  }
}
