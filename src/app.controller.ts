import { Controller, Get, Logger, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { LambdaRequest } from './aws';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getEventAndContext(@Req() request: LambdaRequest): any {
    const ec = {
      event: this.appService.getEvent(request),
      context: this.appService.getContext(request),
    };

    Logger.debug(ec, 'AppController - Request - Event & Context');

    return ec;
  }
}
