import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account';
import { AuthModule } from './modules/auth';
import { ConfigModule } from './modules/config';
import { DatabaseModule } from './modules/database';
import { TestModule } from './modules/test/test.module';
import { GlobalModule } from './modules/global/global.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    TestModule,
    AccountModule,
    GlobalModule,
  ],
  providers: [GlobalModule],
})
export class AppModule {}
