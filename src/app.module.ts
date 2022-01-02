import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth';
import { ConfigModule } from './modules/config';
import { DatabaseModule } from './modules/database';
import { TestModule } from './modules/test/test.module';
import { AccountModule } from './modules/account/account.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, TestModule, AccountModule],
})
export class AppModule {}
