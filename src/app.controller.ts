import { Controller, Get, Logger, Req } from '@nestjs/common';
import { LambdaRequest } from './aws';

@Controller()
export class AppController {
  @Get()
  getEventAndContext(@Req() request: LambdaRequest): any {
    const ec = {
      event: request?.apiGateway?.event,
      context: request?.apiGateway?.context,
    };

    Logger.debug(ec, 'AppController');

    return ec;
  }
}
