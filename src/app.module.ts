import { Module } from '@nestjs/common';
import { TestModule } from './modules/test/test.module';
import { GlobalModule } from './modules/global/global.module';
import { PipelineModule } from './modules/pipeline/pipeline.module';
// import { PipelineColumnModule } from './modules/pipeline-column/pipeline-column.module';
import { PipelineItemModule } from './modules/pipeline-item/pipeline-item.module';
import { PipelineColumnModule } from './modules/pipeline-column/pipeline-column.module';
import { ConfigModule } from './modules/config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    TestModule,
    AccountModule,
    GlobalModule,
    PipelineModule,
    // PipelineColumnModule,
    PipelineItemModule,
    PipelineColumnModule,
  ],
  providers: [GlobalModule],
})
export class AppModule {}
