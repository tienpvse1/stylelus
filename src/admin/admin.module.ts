import AdminJS from 'adminjs';
import { Module } from '@nestjs/common';
import { AdminModule as RootAdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { Account } from '../modules/account/entities/account.entity';
import { Contact } from '../modules/contact-modules/contact/entities/contact.entity';
import { ContactForm } from '../modules/contact-modules/contact-form/entities/contact-form.entity';
import { ContactFormField } from '../modules/contact-modules/contact-form-field/entities/contact-form-field.entity';
import { EmailTemplate } from '../modules/email-template/entities/email-template.entity';
import { Pipeline } from '../modules/pipeline-module/pipeline/entities/pipeline.entity';
import { PipelineColumn } from '../modules/pipeline-module/pipeline-column/entities/pipeline-column.entity';
import { PipelineItem } from '../modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    RootAdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [
          PipelineItem,
          PipelineColumn,
          Pipeline,
          Account,
          EmailTemplate,
          Contact,
          ContactForm,
          ContactFormField,
        ],
        branding: {},
        assets: {
          styles: ['/style.css'],
        },
        pages: {
          home: {
            component: AdminJS.bundle('./pages/home'),
          },
        },
      },
      auth: {
        authenticate: async (email, password) => {
          if (
            (email === 'tienpvse@gmail.com' && password === '123456') ||
            (email === 'admin@gmail.com' && password === 'admin@gmail.com')
          )
            return Promise.resolve({ email });
        },
        cookieName: 'test',
        cookiePassword: '123456',
      },
    }),
  ],
})
export class AdminModule {}
