import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { AccountModule } from '../account';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  imports: [AccountModule],
})
export class AuthModule {}
