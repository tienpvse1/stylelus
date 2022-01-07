import { Injectable } from '@nestjs/common';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { UpdateContactFormDto } from './dto/update-contact-form.dto';

@Injectable()
export class ContactFormService {
  create(createContactFormDto: CreateContactFormDto) {
    return 'This action adds a new contactForm';
  }

  findAll() {
    return `This action returns all contactForm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contactForm`;
  }

  update(id: number, updateContactFormDto: UpdateContactFormDto) {
    return `This action updates a #${id} contactForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactForm`;
  }
}
