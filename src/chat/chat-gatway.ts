import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('send_message')
  sendMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    //NOTE: Test it using postMan

    //NOTE: Test to send event to the current user
    //socket.emit('recieve_message', body);

    //NOTE: Test to send event to all users (Broadcast)
    this.server.emit('recieve_message', body);
  }
}
