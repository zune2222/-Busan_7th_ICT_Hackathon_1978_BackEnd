import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/roles.decorator';
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

  @Get()
  @Role('admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getByUserId(@Param('id') id: string): Promise<User> {
    return this.userService.getByUserId(id);
  }
}
