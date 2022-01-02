import {
  Body, Controller, Delete, Get, Patch, Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common';
import { FindOneOptions } from 'typeorm';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Controller('account')
@ApiTags('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /**
   * create an account
   */
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  /**
   * find account and paginate
   */
  @Get()
  findAll() {
    return this.accountService.findMany({});
  }

  /**
   * get account by id
   */
  @Get('custom')
  findOne(@Body('id') filter: FindOneOptions<Account>) {
    return this.accountService.findOne(filter);
  }

  /**
   * update current account by id(authentication is require)
   */
  @Patch('')
  update(@User('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(id, updateAccountDto);
  }

  /**
   * delete account(soft delete only)
   */
  @Delete('')
  remove(@User('id') id: string) {
    return this.accountService.delete(id);
  }
  /**
   * delete account(completely remove from database)
   */
  @Delete('permanent')
  permanent(@User('id') id: string) {
    return this.accountService.permanentDelete(id);
  }
}
