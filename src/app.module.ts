import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth';
import { ConfigModule } from './modules/config';
import { DatabaseModule } from './modules/database';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, TestModule],
})
export class AppModule {}
