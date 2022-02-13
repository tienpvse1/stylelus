import { AdminModule as RootAdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { Module } from '@nestjs/common';
import AdminJS from 'adminjs';
import { Account } from 'src/modules/account/entities/account.entity';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    RootAdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [Account],
        branding: {
          logo: 'https://iconape.com/wp-content/files/kr/371166/svg/371166.svg',
        },
        assets: {
          styles: ['/style.css'],
        },
        pages: {
          home: {
            component: AdminJS.bundle('./pages/home'),
          },
        },
      },
      auth: {
        authenticate: async (email, password) => {
          if (
            (email === 'tienpvse@gmail.com' && password === '123456') ||
            (email === 'admin@gmail.com' && password === 'admin@gmail.com')
          )
            return Promise.resolve({ email });
        },
        cookieName: 'test',
        cookiePassword: '123456',
      },
    }),
  ],
})
export class AdminModule {}
