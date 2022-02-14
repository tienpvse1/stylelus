import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { FileModule } from './modules/file/file.module';
import { GlobalModule } from './modules/global/global.module';
import { NotificationModule } from './modules/notification/notification.module';
import { StyleModule } from './modules/style/style.module';
import { StylistModule } from './modules/stylist/stylist.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    AccountModule,
    GlobalModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files'),
    }),
    AdminModule,
    NotificationModule,
    StyleModule,
    StylistModule,
  ],
  providers: [GlobalModule],
})
export class AppModule {}
