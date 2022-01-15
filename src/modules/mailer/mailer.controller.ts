import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerService as RootService } from '@nestjs-modules/mailer';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('mailer')
export class MailerController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly rootService: RootService,
  ) {}

  @Post()
  create(@Body() createMailerDto: CreateMailerDto) {
    return this.mailerService.create(createMailerDto);
  }
  @Post(':send')
  @Public()
  async sendEmail(@Body() value: { value: string; to: string }) {
    this.rootService.sendMail({
      to: value.to,
      subject: 'Testing Nest Mailermodule with template ✔',
      html: value.value,
    });
    return 'please check your mail';
  }

  @Get()
  findAll() {
    return this.mailerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailerDto: UpdateMailerDto) {
    return this.mailerService.update(+id, updateMailerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailerService.remove(+id);
  }
}
