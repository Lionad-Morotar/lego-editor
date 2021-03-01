import { Response } from 'express';
import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';

@Controller('site')
export class SiteController {
  @Get()
  query(): string {
    return 'site 2';
  }

  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.OK).send('ok');
  }
}
