import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatConversationMemberService } from './chat-conversation-member.service';
import { CreateChatConversationMemberDto } from './dto/create-chat-conversation-member.dto';
import { UpdateChatConversationMemberDto } from './dto/update-chat-conversation-member.dto';

@Controller()
export class ChatConversationMemberController {
  constructor(private readonly chatConversationMemberService: ChatConversationMemberService) {}

  @MessagePattern('createChatConversationMember')
  create(@Payload() createChatConversationMemberDto: CreateChatConversationMemberDto) {
    return this.chatConversationMemberService.create(createChatConversationMemberDto);
  }

  @MessagePattern('findAllChatConversationMember')
  findAll() {
    return this.chatConversationMemberService.findAll();
  }

  @MessagePattern('findOneChatConversationMember')
  findById(@Payload() id: string) {
    return this.chatConversationMemberService.findById(id);
  }

  @MessagePattern('updateChatConversationMember')
  update(@Payload() updateChatConversationMemberDto: UpdateChatConversationMemberDto) {
    return this.chatConversationMemberService.update(updateChatConversationMemberDto.id, updateChatConversationMemberDto);
  }

  @MessagePattern('removeChatConversationMember')
  remove(@Payload() id: string) {
    return this.chatConversationMemberService.remove(id);
  }
}
