import { hashSync } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
import { BaseEntity } from 'src/base/entity.base';
import { Roles } from 'src/constance';
import { EmailTemplate } from 'src/modules/email-template/entities/email-template.entity';
import { Pipeline } from 'src/modules/pipeline-module/pipeline/entities/pipeline.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToMany,
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

  @Column({ type: 'enum', enum: Roles, default: Roles.CLIENT })
  role: Roles;

  @OneToMany(() => EmailTemplate, (emailTemplates) => emailTemplates.account)
  emailTemplates: EmailTemplate[];

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

  @OneToOne(() => Pipeline, (pipeline) => pipeline.account, { eager: true })
  pipeline: Pipeline;
}
