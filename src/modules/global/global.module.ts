import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/common/filter/exception.filter';
import { TransformInterceptor } from 'src/common/interceptor/response.interceptor';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { RoleGuard } from '../auth/guard/role.guard';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class GlobalModule {}
