import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { TestsModule } from './tests/test.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'test',
      entities: [Test],
      synchronize: true,
    }),
    TestsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}