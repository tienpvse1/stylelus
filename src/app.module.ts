import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { GlobalModule } from './modules/global/global.module';
import { PipelineModule } from './modules/pipeline-module/pipeline/pipeline.module';
import { TestModule } from './modules/test/test.module';
import { ContactModule } from './modules/contact-modules/contact/contact.module';
import { ContactFormModule } from './modules/contact-modules/contact-form/contact-form.module';
import { ContactFormFieldModule } from './modules/contact-modules/contact-form-field/contact-form-field.module';
import { PipelineItemModule } from './modules/pipeline-module/pipeline-item/pipeline-item.module';
import { PipelineColumnModule } from './modules/pipeline-module/pipeline-column/pipeline-column.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    TestModule,
    AccountModule,
    GlobalModule,
    PipelineModule,
    PipelineItemModule,
    PipelineColumnModule,
    ContactModule,
    ContactFormModule,
    ContactFormFieldModule,
  ],
  providers: [GlobalModule],
})
export class AppModule {}
