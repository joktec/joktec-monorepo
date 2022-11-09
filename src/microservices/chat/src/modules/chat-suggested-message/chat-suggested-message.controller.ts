import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatSuggestedMessageService } from './chat-suggested-message.service';
import { CreateChatSuggestedMessageDto } from './dto/create-chat-suggested-message.dto';
import { UpdateChatSuggestedMessageDto } from './dto/update-chat-suggested-message.dto';

@Controller()
export class ChatSuggestedMessageController {
  constructor(private readonly chatSuggestedMessageService: ChatSuggestedMessageService) {}

  @MessagePattern('createChatSuggestedMessage')
  create(@Payload() createChatSuggestedMessageDto: CreateChatSuggestedMessageDto) {
    return this.chatSuggestedMessageService.create(createChatSuggestedMessageDto);
  }

  @MessagePattern('findAllChatSuggestedMessage')
  findAll() {
    return this.chatSuggestedMessageService.findAll();
  }

  @MessagePattern('findOneChatSuggestedMessage')
  findById(@Payload() id: string) {
    return this.chatSuggestedMessageService.findById(id);
  }

  @MessagePattern('updateChatSuggestedMessage')
  update(@Payload() updateChatSuggestedMessageDto: UpdateChatSuggestedMessageDto) {
    return this.chatSuggestedMessageService.update(updateChatSuggestedMessageDto.id, updateChatSuggestedMessageDto);
  }

  @MessagePattern('removeChatSuggestedMessage')
  remove(@Payload() id: string) {
    return this.chatSuggestedMessageService.remove(id);
  }
}
