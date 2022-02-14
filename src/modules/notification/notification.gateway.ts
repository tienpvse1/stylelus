import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { DeepPartial } from 'typeorm';
import { AccountService } from '../account/account.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
@WebSocketGateway({ namespace: 'notification', cors: true })
export class NotificationGateway {
  constructor(
    private readonly service: NotificationService,
    private readonly accountService: AccountService,
  ) {}

  @SubscribeMessage('createNotification')
  async create(client: Socket, payload: CreateNotificationDto) {
    const rawReceiver = await this.accountService.findById(payload.receiverId, {
      relations: ['session'],
    });
    const sender = await this.accountService.findById(payload.senderId);
    const { session, ...receiver } = rawReceiver;

    const itemToCreate: DeepPartial<Notification> = {
      bookedDate: new Date(),
      seen: false,
      sender,
      receiver,
    };
    const createResult = await this.service.createItem(itemToCreate);

    client.to(session.socketId).emit('incomingNotification', createResult);
  }
}
