import { Injectable } from '@nestjs/common';
import { CreateContactFormFieldDto } from './dto/create-contact-form-field.dto';
import { UpdateContactFormFieldDto } from './dto/update-contact-form-field.dto';

@Injectable()
export class ContactFormFieldService {
  create(createContactFormFieldDto: CreateContactFormFieldDto) {
    return 'This action adds a new contactFormField';
  }

  findAll() {
    return `This action returns all contactFormField`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contactFormField`;
  }

  update(id: number, updateContactFormFieldDto: UpdateContactFormFieldDto) {
    return `This action updates a #${id} contactFormField`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactFormField`;
  }
}
