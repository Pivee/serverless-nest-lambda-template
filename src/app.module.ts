import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpRequestInterceptor } from './.core/middleware/http-request-interceptor/http-request.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ApiModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpRequestInterceptor,
    },
  ],
})
export class AppModule {}
