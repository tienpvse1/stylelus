import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService extends BaseService<Notification> {
  constructor(@InjectRepository(Notification) repo: Repository<Notification>) {
    super(repo);
  }
}
