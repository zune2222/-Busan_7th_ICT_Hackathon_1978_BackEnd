import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievement } from 'src/entities/achievement.entity';
import { Repository } from 'typeorm';
import {
  CreateAchievementRequestDto,
  CreateAchievementResponseDto,
} from './dto/create-achievement.dto';
import { GetAchievementResponseDto } from './dto/get-achievement.dto';
import { UpdateAchievementRequestDto } from './dto/update-achievement.dto';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Achievement)
    private achievementRepository: Repository<Achievement>,
  ) {}

  async createAchievement(
    userId: number,
    newAchievement: CreateAchievementRequestDto,
  ): Promise<CreateAchievementResponseDto> {
    const isExist = await this.achievementRepository.findOneBy({
      userId: userId,
      dailyLogId: newAchievement.dailyLogId,
    });

    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 만들어져있는 achievement 정보임`],
      });
    }

    return await this.achievementRepository.save({
      userId: userId,
      dailyLogId: newAchievement.dailyLogId,
      title: newAchievement.title,
      startTime: newAchievement.startTime,
      endTime: newAchievement.endTime,
      progress: 0,
      position: newAchievement.position,
    });
  }

  async getAchievement(
    userId: number,
    _id: number,
  ): Promise<GetAchievementResponseDto> {
    const isExist = await this.achievementRepository.findOneBy({
      _id: _id,
      userId: userId,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`그런 achievement 정보는 없음`],
      });
    }

    return isExist;
  }

  async update(updateAchievement: UpdateAchievementRequestDto): Promise<void> {
    const isExist = await this.achievementRepository.findOneBy({
      _id: updateAchievement._id,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`그런 achievement 정보는 없음`],
      });
    }

    await this.achievementRepository.update(
      {
        _id: updateAchievement._id,
      },
      {
        dailyLogId: updateAchievement.dailyLogId,
        title: updateAchievement.title,
        startTime: updateAchievement.startTime,
        endTime: updateAchievement.endTime,
        progress: updateAchievement.progress,
      },
    );
  }

  async delete(id: number): Promise<void> {
    const isExist = await this.achievementRepository.findOneBy({ _id: id });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 없어서 못 지움`],
        error: 'Forbidden',
      });
    }

    await this.achievementRepository.delete({ _id: id });
  }
}
