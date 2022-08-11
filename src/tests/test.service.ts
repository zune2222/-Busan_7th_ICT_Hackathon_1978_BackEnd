import { Injectable } from "@nestjs/common";
import { Test } from "../entities/test.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTestDto } from "./dto/create-test.dto";

@Injectable()
export class TestsService {
    constructor(
        @InjectRepository(Test)
        private testsRepository: Repository<Test>,
    ) {}

    create(createTestDto: CreateTestDto): Promise<Test> {
        const test = new Test();
        test.id = createTestDto.id;
        test.email = createTestDto.email;
        test.password = createTestDto.password;

        return this.testsRepository.save(test);
    }
    
    async findAll(): Promise<Test[]> {
        return this.testsRepository.find();
    }

    async remove(id: number): Promise<void> {
        await this.testsRepository.delete(id);
    }
}