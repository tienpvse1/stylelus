import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guard/google.guard';
import { IGoogleUser } from './interfaces/user.google';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @Public()
  @UseGuards(GoogleAuthGuard)
  login() {}

  @Get('google/redirect')
  @ApiBearerAuth('')
  @Public()
  @UseGuards(GoogleAuthGuard)
  redirect(@Req() request: Request) {
    return this.authService.findOrCreateAccount(request.user as IGoogleUser);
  }
}
