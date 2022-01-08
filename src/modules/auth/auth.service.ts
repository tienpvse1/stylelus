import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { AccountService } from '../account/account.service';
import { Account } from '../account/entities/account.entity';
import { LoginRequestDto } from './interfaces/login-request.dto';
import { IToken } from './interfaces/token.interface';
import { IGoogleUser } from './interfaces/user.google';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  // binding isSocialAccount field with true value to mark this account use social login method
  // password will not be required to be created
  setSocialAccount(account: unknown) {
    Object.assign(account, { isSocialAccount: true });
  }

  generateJWTToken(account: Account) {
    const { email, id, firstName, lastName, role } = account;
    const tokenPayload: Partial<IToken> = {
      subject: id,
      payload: {
        email,
        firstName,
        id,
        lastName,
        role,
      },
    };

    return this.jwtService.sign(tokenPayload);
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

    // if account haven't exist in database, save it
    if (!account) {
      const newAccount = await this.accountService.create(rest);
      return this.generateJWTToken(newAccount);
    }
    // else grab the account in database
    else return this.generateJWTToken(account);
  }

  async loginByEmailPassword({ email, password }: LoginRequestDto) {
    try {
      const account = await this.accountService.findOne({
        where: { email },
        select: [
          'email',
          'password',
          'id',
          'role',
          'firstName',
          'lastName',
          'isSocialAccount',
        ],
      });

      if (!account.password)
        throw new UnauthorizedException(
          'account already registered with google login method',
        );
      const checkPasswordResult = compareSync(password, account.password);

      if (!checkPasswordResult)
        throw new UnauthorizedException('check your password');
      return this.generateJWTToken(account);
    } catch (error) {
      throw new BadRequestException(error.message || 'unauthorized');
    }
  }
}
