import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { MailerModule as RootMailer } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config/config.module';
@Module({
  controllers: [MailerController],
  providers: [MailerService],
  imports: [
    RootMailer.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: `smtps://${config.get<string>(
          'google.googleUsername',
        )}:${config.get<string>('google.googlePassword')}@smtp.gmail.com`,
        defaults: {
          from: 'good66612@gmail.com',
        },
      }),
    }),
  ],
})
export class MailerModule {}
