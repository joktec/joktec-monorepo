import { Injectable } from '@nestjs/common';
import { CreateMarketValueInstructionFeedbackDto } from './dto/create-market-value-instruction-feedback.dto';
import { UpdateMarketValueInstructionFeedbackDto } from './dto/update-market-value-instruction-feedback.dto';

@Injectable()
export class MarketValueInstructionFeedbackService {
  create(createMarketValueInstructionFeedbackDto: CreateMarketValueInstructionFeedbackDto) {
    return 'This action adds a new marketValueInstructionFeedback';
  }

  findAll() {
    return `This action returns all marketValueInstructionFeedback`;
  }

  findById(id: number) {
    return `This action returns a #${id} marketValueInstructionFeedback`;
  }

  update(id: number, updateMarketValueInstructionFeedbackDto: UpdateMarketValueInstructionFeedbackDto) {
    return `This action updates a #${id} marketValueInstructionFeedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} marketValueInstructionFeedback`;
  }
}
