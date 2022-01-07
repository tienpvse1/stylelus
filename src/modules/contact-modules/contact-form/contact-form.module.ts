import { Module } from '@nestjs/common';
import { ContactFormService } from './contact-form.service';
import { ContactFormController } from './contact-form.controller';

@Module({
  controllers: [ContactFormController],
  providers: [ContactFormService]
})
export class ContactFormModule {}
