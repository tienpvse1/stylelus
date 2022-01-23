import { MailerService as RootService } from '@nestjs-modules/mailer';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { MailerService } from './mailer.service';

@Controller('mailer')
@ApiTags('email')
export class MailerController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly rootService: RootService,
  ) {}

  @Post('send')
  @Public()
  async sendEmail(@Body() email: CreateMailerDto) {
    this.rootService.sendMail({
      to: email.to,
      subject: email.subject,
      html: email.value,
    });
    return 'please check your mail';
  }

  @Get()
  findAll() {
    return this.mailerService.findAll();
  }
}
