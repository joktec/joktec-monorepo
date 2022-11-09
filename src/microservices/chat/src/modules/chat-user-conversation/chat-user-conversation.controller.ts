import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatUserConversationService } from './chat-user-conversation.service';
import { CreateChatUserConversationDto } from './dto/create-chat-user-conversation.dto';
import { UpdateChatUserConversationDto } from './dto/update-chat-user-conversation.dto';

@Controller()
export class ChatUserConversationController {
  constructor(private readonly chatUserConversationService: ChatUserConversationService) {}

  @MessagePattern('createChatUserConversation')
  create(@Payload() createChatUserConversationDto: CreateChatUserConversationDto) {
    return this.chatUserConversationService.create(createChatUserConversationDto);
  }

  @MessagePattern('findAllChatUserConversation')
  findAll() {
    return this.chatUserConversationService.findAll();
  }

  @MessagePattern('findOneChatUserConversation')
  findById(@Payload() id: string) {
    return this.chatUserConversationService.findById(id);
  }

  @MessagePattern('updateChatUserConversation')
  update(@Payload() updateChatUserConversationDto: UpdateChatUserConversationDto) {
    return this.chatUserConversationService.update(updateChatUserConversationDto.id, updateChatUserConversationDto);
  }

  @MessagePattern('removeChatUserConversation')
  remove(@Payload() id: string) {
    return this.chatUserConversationService.remove(id);
  }
}
