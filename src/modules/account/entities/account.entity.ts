import { hashSync } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
import { BaseEntity } from 'src/base/entity.base';
import { Session } from 'src/modules/session/entities/session.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToOne,
} from 'typeorm';
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

  @Column({ nullable: true })
  @Length(10)
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ default: false, name: 'is_social_account' })
  isSocialAccount: boolean;

  @OneToOne(() => Session, (session) => session.account)
  session: Session;

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
