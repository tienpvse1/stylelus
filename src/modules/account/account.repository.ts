import { BaseRepository } from 'src/base';
import { EntityRepository } from 'typeorm';
import { Account } from './entities/account.entity';

@EntityRepository(Account)
export class AccountRepository extends BaseRepository<Account> {}
