import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthRoutes } from '@enroute/definitions';
import { JwtAuthGuard } from '../../jwt-auth.guard';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller(AuthRoutes.AUTH.prefix)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(AuthRoutes.AUTH.LOGIN.path)
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(AuthRoutes.AUTH.LOGIN.path)
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.user_id);
  }
}
