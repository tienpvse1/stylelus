import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { AccountModule } from '../account/account.module';

@Module({
  providers: [NotificationGateway, NotificationService],
  imports: [TypeOrmModule.forFeature([Notification]), AccountModule],
})
export class NotificationModule {}
