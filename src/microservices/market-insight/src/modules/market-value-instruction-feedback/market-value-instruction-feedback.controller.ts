import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketValueInstructionFeedbackService } from './market-value-instruction-feedback.service';
import { CreateMarketValueInstructionFeedbackDto } from './dto/create-market-value-instruction-feedback.dto';
import { UpdateMarketValueInstructionFeedbackDto } from './dto/update-market-value-instruction-feedback.dto';

@Controller('market-value-instruction-feedback')
export class MarketValueInstructionFeedbackController {
  constructor(private readonly marketValueInstructionFeedbackService: MarketValueInstructionFeedbackService) {}

  @Post()
  create(@Body() createMarketValueInstructionFeedbackDto: CreateMarketValueInstructionFeedbackDto) {
    return this.marketValueInstructionFeedbackService.create(createMarketValueInstructionFeedbackDto);
  }

  @Get()
  findAll() {
    return this.marketValueInstructionFeedbackService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.marketValueInstructionFeedbackService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketValueInstructionFeedbackDto: UpdateMarketValueInstructionFeedbackDto) {
    return this.marketValueInstructionFeedbackService.update(+id, updateMarketValueInstructionFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketValueInstructionFeedbackService.remove(+id);
  }
}
