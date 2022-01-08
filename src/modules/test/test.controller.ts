import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from '../auth/guard/google.guard';

@Controller('test')
export class TestController {
  @Get()
  @UseGuards(GoogleAuthGuard)
  getSomeThing() {
    return 'if you see this, you must have been authenticated';
  }
  @Get(':id')
  @UseGuards(GoogleAuthGuard)
  getSomeThing2() {
    return 'if you see this, you must have been authenticated2';
  }
  @Get(':id/3')
  @UseGuards(GoogleAuthGuard)
  getSomeThing3() {
    return 'if you see this, you must have been authenticated3';
  }
}
