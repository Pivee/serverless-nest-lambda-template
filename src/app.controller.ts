import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':name')
  getHelloWithName(@Param('name') name: string): string {
    return this.appService.getHello(name);
  }

  @Get(':name/:age')
  getHelloWithNameAndAge(
    @Param('name') name: string,
    @Param('age') age: string,
    @Query() query: any,
  ): string {
    return this.appService.getHello(name, age, query);
  }
}
