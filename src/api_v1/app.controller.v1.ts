import { Controller, Get, Res } from '@nestjs/common';

@Controller('/api_v1/dailychart')
export class AppControllerV1 {
  @Get()
  async getChart(@Res() res) {
    res.send('hi');
  }
}
