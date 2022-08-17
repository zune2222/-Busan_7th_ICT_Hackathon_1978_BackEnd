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

  async create(
    createAchievementRequestDto: CreateAchievementRequestDto,
  ): Promise<CreateAchievementResponseDto> {
    const isExist = await this.achievementRepository.findOneBy({
      dailyLogId: createAchievementRequestDto.dailyLogId,
      title: createAchievementRequestDto.title,
    });

    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 만들어져있는 achievement 정보임`],
      });
    }

    return await this.achievementRepository.save(createAchievementRequestDto);
  }

  async getAchievement(
    dailyLogId: string,
    title: string,
  ): Promise<GetAchievementResponseDto> {
    const isExist = await this.achievementRepository.findOneBy({
      dailyLogId: dailyLogId,
      title: title,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`그런 achievement 정보는 없음`],
      });
    }

    return isExist;
  }

  async update(
    updateAchievementRequestDto: UpdateAchievementRequestDto,
  ): Promise<void> {
    const isExist = await this.achievementRepository.findOneBy({
      dailyLogId: updateAchievementRequestDto.dailyLogId,
      title: updateAchievementRequestDto.title,
    });

    if (!isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`그런 achievement 정보는 없음`],
      });
    }

    await this.achievementRepository.update(
      {
        dailyLogId: updateAchievementRequestDto.dailyLogId,
        title: updateAchievementRequestDto.title,
      },
      {
        startTime: updateAchievementRequestDto.startTime,
        endTime: updateAchievementRequestDto.endTime,
        progress: updateAchievementRequestDto.progress,
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
