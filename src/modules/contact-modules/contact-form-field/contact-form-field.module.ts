import { Module } from '@nestjs/common';
import { ContactFormFieldService } from './contact-form-field.service';
import { ContactFormFieldController } from './contact-form-field.controller';

@Module({
  controllers: [ContactFormFieldController],
  providers: [ContactFormFieldService]
})
export class ContactFormFieldModule {}
