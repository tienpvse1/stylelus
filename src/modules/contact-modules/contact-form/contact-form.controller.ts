import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactFormService } from './contact-form.service';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { UpdateContactFormDto } from './dto/update-contact-form.dto';
@Controller('contact-form')
@ApiTags('contact form')
export class ContactFormController {
  constructor(private readonly contactFormService: ContactFormService) {}

  @Post()
  create(@Body() createContactFormDto: CreateContactFormDto) {
    return this.contactFormService.create(createContactFormDto);
  }

  @Get()
  findAll() {
    return this.contactFormService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactFormService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactFormDto: UpdateContactFormDto,
  ) {
    return this.contactFormService.update(id, updateContactFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactFormService.delete(id);
  }
}
