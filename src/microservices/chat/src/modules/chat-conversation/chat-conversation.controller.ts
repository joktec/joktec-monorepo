import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatConversationService } from './chat-conversation.service';
import { CreateChatConversationDto } from './dto/create-chat-conversation.dto';
import { UpdateChatConversationDto } from './dto/update-chat-conversation.dto';

@Controller('chat-conversation')
export class ChatConversationController {
  constructor(private readonly chatConversationService: ChatConversationService) {}

  @MessagePattern('chat_microservice_create')
  create(@Payload() createChatConversationDto: CreateChatConversationDto) {
    return this.chatConversationService.create(createChatConversationDto);
  }

  @MessagePattern('chat_microservice_find_all')
  findAll() {
    return this.chatConversationService.findAll();
  }

  @MessagePattern('chat_microservice_find_one')
  findById(@Payload() id: string) {
    return this.chatConversationService.findById(id);
  }

  @MessagePattern('chat_microservice_find_update')
  update(@Payload() updateChatConversationDto: UpdateChatConversationDto) {
    return this.chatConversationService.update(updateChatConversationDto.id, updateChatConversationDto);
  }

  @MessagePattern('chat_microservice_find_remove')
  remove(@Payload() id: string) {
    return this.chatConversationService.remove(id);
  }
}
