import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity({ name: 'stylist_information' })
export class Stylist extends BaseEntity {
  @Column()
  address: string;
  @Column()
  image: string;
  @Column({ name: 'phone_number' })
  phoneNumber: string;
  @Column()
  longitude: string;
  @Column()
  latitude: string;
  @Column({ type: 'date' })
  birth: Date;

  @OneToOne(() => Account, (account) => account.stylistInfo)
  account: Account;
}
