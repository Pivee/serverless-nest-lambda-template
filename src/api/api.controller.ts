import { Controller, Get, Logger, Param, Query, Req } from '@nestjs/common';
import { LambdaRequest } from 'src/aws';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getHello(@Req() request): string {
    Logger.debug(
      {
        event: request?.apiGateway?.event,
        context: request?.apiGateway?.context,
      },
      'AppController',
    );
    return this.apiService.getHello();
  }

  @Get('/ec')
  getEvent(@Req() request: LambdaRequest): any {
    return {
      event: request?.apiGateway?.event,
      context: request?.apiGateway?.context,
    };
  }

  @Get(':name')
  getHelloWithName(@Param('name') name: string): string {
    return this.apiService.getHello(name);
  }

  @Get(':name/:age')
  getHelloWithNameAndAge(
    @Param('name') name: string,
    @Param('age') age: string,
    @Query() query: any,
  ): string {
    return this.apiService.getHello(name, age, query);
  }
}
