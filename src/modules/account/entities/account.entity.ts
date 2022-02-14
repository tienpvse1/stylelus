import { hashSync } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
import { BaseEntity } from 'src/base/entity.base';
import { Session } from 'src/modules/session/entities/session.entity';
import { Notification } from 'src/modules/notification/entities/notification.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Stylist } from 'src/modules/stylist/entities/stylist.entity';
@Entity()
export class Account extends BaseEntity {
  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ nullable: true })
  photo: string;

  @Column()
  @Index({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  position: string;

  @Column({ type: 'int' })
  served: number;

  @Column({ type: 'boolean', default: false, name: 'is_stylist' })
  isStylist: boolean;

  @Column({ nullable: true })
  @Length(10)
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ default: false, name: 'is_social_account' })
  isSocialAccount: boolean;

  @OneToOne(() => Stylist, (stylistInfo) => stylistInfo.account)
  stylistInfo: Stylist;

  @OneToOne(() => Session, (session) => session.account)
  session: Session;

  @OneToMany(() => Notification, (notification) => notification.sender)
  sentNotifications: Notification[];

  @OneToMany(() => Notification, (notification) => notification.receiver)
  incomingNotifications: Notification[];

  // hash the password before save or update it in database
  @BeforeInsert()
  hashPassword() {
    // only hash if there's password
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }
  @BeforeUpdate()
  hashPasswordBeforeUpdate() {
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }
}
