import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SiteController } from '../site/site.controller';
import { UserController } from '../user/user.controller';

@Module({
  imports: [],
  controllers: [AppController, SiteController, UserController],
  providers: [AppService],
})
export class AppModule {}
