import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Notification extends BaseEntity {
  @Column({ name: 'booked_date' })
  bookedDate: Date;

  @Column({ default: false, type: 'boolean' })
  seen: boolean;

  @ManyToOne(() => Account, (account) => account.sentNotifications, {
    cascade: true,
  })
  sender: Account;

  @ManyToOne(() => Account, (account) => account.incomingNotifications, {
    cascade: true,
  })
  receiver: Account;
}
