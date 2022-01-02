import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from '../auth/guard/google.guard';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  getSomeThing() {
    return 'if you see this, you must have been authenticated';
  }
}
