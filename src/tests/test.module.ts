import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Test } from "src/entities/test.entity";
import { TestsController } from "./test.controller";
import { TestsService } from "./test.service";

@Module({
    imports: [TypeOrmModule.forFeature([Test])],
    providers: [TestsService],
    controllers: [TestsController],
})
export class TestsModule {}