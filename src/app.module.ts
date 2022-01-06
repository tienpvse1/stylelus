import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { GlobalModule } from './modules/global/global.module';
import { PipelineColumnModule } from './modules/pipeline-column/pipeline-column.module';
import { PipelineItemModule } from './modules/pipeline-item/pipeline-item.module';
import { PipelineModule } from './modules/pipeline/pipeline.module';
import { TestModule } from './modules/test/test.module';

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
  ],
  providers: [GlobalModule],
})
export class AppModule {}
