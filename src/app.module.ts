import { Module } from '@nestjs/common';
import { ConfigModule } from './modules/config';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
})
export class AppModule {}
