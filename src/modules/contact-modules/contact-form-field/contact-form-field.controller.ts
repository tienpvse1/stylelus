import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactFormFieldService } from './contact-form-field.service';
import { CreateContactFormFieldDto } from './dto/create-contact-form-field.dto';
import { UpdateContactFormFieldDto } from './dto/update-contact-form-field.dto';

@Controller('contact-form-field')
export class ContactFormFieldController {
  constructor(private readonly contactFormFieldService: ContactFormFieldService) {}

  @Post()
  create(@Body() createContactFormFieldDto: CreateContactFormFieldDto) {
    return this.contactFormFieldService.create(createContactFormFieldDto);
  }

  @Get()
  findAll() {
    return this.contactFormFieldService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactFormFieldService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactFormFieldDto: UpdateContactFormFieldDto) {
    return this.contactFormFieldService.update(+id, updateContactFormFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactFormFieldService.remove(+id);
  }
}
