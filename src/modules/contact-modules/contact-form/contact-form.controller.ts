import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactFormService } from './contact-form.service';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { UpdateContactFormDto } from './dto/update-contact-form.dto';

@Controller('contact-form')
export class ContactFormController {
  constructor(private readonly contactFormService: ContactFormService) {}

  @Post()
  create(@Body() createContactFormDto: CreateContactFormDto) {
    return this.contactFormService.create(createContactFormDto);
  }

  @Get()
  findAll() {
    return this.contactFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactFormService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactFormDto: UpdateContactFormDto) {
    return this.contactFormService.update(+id, updateContactFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactFormService.remove(+id);
  }
}
