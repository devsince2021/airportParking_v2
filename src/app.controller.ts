import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedGuard } from './domains/auth/guards/authenticated.guard';

@Controller()
export class AppViewController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  @Render('dashboard.ejs')
  async showDashBoard() {
    return { title: '대시보드' };
  }
}
