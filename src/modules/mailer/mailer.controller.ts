import { MailerService as RootService } from '@nestjs-modules/mailer';
import { Body, Controller, Ip, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { EmailService } from './mailer.service';

@Controller('mailer')
@ApiTags('email')
export class MailerController {
  constructor(
    private readonly mailerService: EmailService,
    private readonly rootService: RootService,
  ) {}

  @Post('send')
  async sendEmail(
    @Body() email: CreateMailerDto,
    @Ip() ip: string,
    @User('id') senderId: string,
  ) {
    this.mailerService.addEmailToDB(email, ip, senderId);
    this.rootService.sendMail({
      to: email.to,
      subject: email.subject,
      html: email.value,
    });
    return 'please check your mail';
  }
}
