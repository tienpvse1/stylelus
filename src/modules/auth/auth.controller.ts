import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guard/google.guard';
import { IGoogleUser } from './interfaces/user.google';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  login() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  redirect(@Req() request: Request) {
    return this.authService.findOrCreateAccount(request.user as IGoogleUser);
  }
}
