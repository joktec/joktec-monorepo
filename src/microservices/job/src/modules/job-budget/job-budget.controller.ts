import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobBudgetService } from './job-budget.service';
import { CreateJobBudgetDto } from './dto/create-job-budget.dto';
import { UpdateJobBudgetDto } from './dto/update-job-budget.dto';

@Controller('job-budget')
export class JobBudgetController {
  constructor(private readonly jobBudgetService: JobBudgetService) {}

  @Post()
  create(@Body() createJobBudgetDto: CreateJobBudgetDto) {
    return this.jobBudgetService.create(createJobBudgetDto);
  }

  @Get()
  findAll() {
    return this.jobBudgetService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobBudgetService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobBudgetDto: UpdateJobBudgetDto) {
    return this.jobBudgetService.update(id, updateJobBudgetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobBudgetService.remove(id);
  }
}
