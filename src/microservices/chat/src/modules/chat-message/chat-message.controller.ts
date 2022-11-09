import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatMessageService } from './chat-message.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';

@Controller()
export class ChatMessageController {
  constructor(private readonly chatMessageService: ChatMessageService) {}

  @MessagePattern('createChatMessage')
  create(@Payload() createChatMessageDto: CreateChatMessageDto) {
    return this.chatMessageService.create(createChatMessageDto);
  }

  @MessagePattern('findAllChatMessage')
  findAll() {
    return this.chatMessageService.findAll();
  }

  @MessagePattern('findOneChatMessage')
  findById(@Payload() id: string) {
    return this.chatMessageService.findById(id);
  }

  @MessagePattern('updateChatMessage')
  update(@Payload() updateChatMessageDto: UpdateChatMessageDto) {
    return this.chatMessageService.update(updateChatMessageDto.id, updateChatMessageDto);
  }

  @MessagePattern('removeChatMessage')
  remove(@Payload() id: string) {
    return this.chatMessageService.remove(id);
  }
}
