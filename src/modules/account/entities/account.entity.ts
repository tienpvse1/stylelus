import { IsEmail, Length } from 'class-validator';
import { BaseEntity } from 'src/base';
import { BeforeInsert, BeforeUpdate, Column, Entity, Index } from 'typeorm';
import { hashSync } from 'bcryptjs';
@Entity()
export class Account extends BaseEntity {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ nullable: true })
  photo: string;

  @Column()
  @Index({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({ select: false, nullable: true })
  @Length(10)
  password: string;

  @Column({ default: false, name: 'is_social_account' })
  isSocialAccount: boolean;

  // hash the password before save or update it in database
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    // only hash if there's password
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }
}
