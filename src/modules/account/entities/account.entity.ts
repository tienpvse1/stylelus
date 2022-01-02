import { BaseEntity } from 'src/base';
import { Column } from 'typeorm';

export class Account extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName:string;
  
  @Column()
  photo: string;

  @Column()

  email: string
}