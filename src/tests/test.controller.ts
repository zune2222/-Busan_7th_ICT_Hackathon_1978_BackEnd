import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Test } from "src/entities/test.entity";
import { CreateTestDto } from "./dto/create-test.dto";
import { TestsService } from "./test.service";

@Controller('tests')
export class TestsController {
    constructor(private readonly testsService: TestsService) {}

    @Post()
    create(@Body() createTestDto: CreateTestDto): Promise<Test> {
        return this.testsService.create(createTestDto);
    }

    @Get()
    findAll(): Promise<Test[]> {
        return this.testsService.findAll();
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.testsService.remove(id);
    }
}