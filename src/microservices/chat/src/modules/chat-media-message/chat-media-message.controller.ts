import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatMediaMessageService } from './chat-media-message.service';
import { CreateChatMediaMessageDto } from './dto/create-chat-media-message.dto';
import { UpdateChatMediaMessageDto } from './dto/update-chat-media-message.dto';

@Controller()
export class ChatMediaMessageController {
  constructor(private readonly chatMediaMessageService: ChatMediaMessageService) {}

  @MessagePattern('createChatMediaMessage')
  create(@Payload() createChatMediaMessageDto: CreateChatMediaMessageDto) {
    return this.chatMediaMessageService.create(createChatMediaMessageDto);
  }

  @MessagePattern('findAllChatMediaMessage')
  findAll() {
    return this.chatMediaMessageService.findAll();
  }

  @MessagePattern('findOneChatMediaMessage')
  findById(@Payload() id: string) {
    return this.chatMediaMessageService.findById(id);
  }

  @MessagePattern('updateChatMediaMessage')
  update(@Payload() updateChatMediaMessageDto: UpdateChatMediaMessageDto) {
    return this.chatMediaMessageService.update(updateChatMediaMessageDto.id, updateChatMediaMessageDto);
  }

  @MessagePattern('removeChatMediaMessage')
  remove(@Payload() id: string) {
    return this.chatMediaMessageService.remove(id);
  }
}
