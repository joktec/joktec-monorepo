import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatMediaFileService } from './chat-media-file.service';
import { CreateChatMediaFileDto } from './dto/create-chat-media-file.dto';
import { UpdateChatMediaFileDto } from './dto/update-chat-media-file.dto';

@Controller()
export class ChatMediaFileController {
  constructor(private readonly chatMediaFileService: ChatMediaFileService) {}

  @MessagePattern('createChatMediaFile')
  create(@Payload() createChatMediaFileDto: CreateChatMediaFileDto) {
    return this.chatMediaFileService.create(createChatMediaFileDto);
  }

  @MessagePattern('findAllChatMediaFile')
  findAll() {
    return this.chatMediaFileService.findAll();
  }

  @MessagePattern('findOneChatMediaFile')
  findById(@Payload() id: string) {
    return this.chatMediaFileService.findById(id);
  }

  @MessagePattern('updateChatMediaFile')
  update(@Payload() updateChatMediaFileDto: UpdateChatMediaFileDto) {
    return this.chatMediaFileService.update(updateChatMediaFileDto.id, updateChatMediaFileDto);
  }

  @MessagePattern('removeChatMediaFile')
  remove(@Payload() id: string) {
    return this.chatMediaFileService.remove(id);
  }
}
