import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { ContactFormRepository } from './contact-form.repository';
import { ContactForm } from './entities/contact-form.entity';

@Injectable()
export class ContactFormService extends CRUDService<
  ContactForm,
  ContactFormRepository
> {
  constructor(
    @InjectRepository(ContactFormRepository) repository: ContactFormRepository,
  ) {
    super(repository);
  }
}
