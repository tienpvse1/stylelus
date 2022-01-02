import { Injectable } from '@nestjs/common';
import { AccountService } from '../account';
import { IGoogleUser } from './interfaces/user.google';

@Injectable()
export class AuthService {
  constructor(private accountService: AccountService) {}

  setSocialAccount(account: unknown) {
    Object.assign(account, { isSocialAccount: true });
  }

  // create account if not exist in database
  // based on email
  async findOrCreateAccount(user: IGoogleUser) {
    const { accessToken, ...rest } = user;
    const account = await this.accountService.findOneWithoutError({
      where: {
        email: rest.email,
      },
    });
    // mark this as an social account(google, facebook,etc..)
    // this case it's google account
    this.setSocialAccount(rest);

    if (!account) {
      const newAccount = await this.accountService.create(rest);
      return newAccount;
    } else return account;
  }
}
