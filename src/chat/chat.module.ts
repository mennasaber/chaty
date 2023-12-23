import { Module } from '@nestjs/common';
import { ChatGateway } from './chat-gatway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
