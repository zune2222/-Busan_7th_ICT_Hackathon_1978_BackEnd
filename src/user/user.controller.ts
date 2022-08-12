import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.create(createUserDto);
  }

  // admin 역할 부여해서 권한 강화하기
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  // admin 역할 부여해서 권한 강화하기
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getByUserId(@Param('id') id: string): Promise<User> {
    return this.userService.getByUserId(id);
  }
}
