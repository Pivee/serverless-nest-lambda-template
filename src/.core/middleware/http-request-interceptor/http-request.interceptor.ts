import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements NestInterceptor {
  private nestLogger: Logger;

  constructor() {
    this.nestLogger = new Logger();
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const timestampBefore = Date.now();

    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    const originalUrl = request.originalUrl;
    const httpMethod = request.method;

    const requestHeaders = request.headers ? request.headers : {};
    const requestCookies = request.cookies ? request.cookies : {};
    const requestParams = request.params ? request.params : {};
    const requestQuery = request.query ? request.query : {};
    const requestBody = request.body ? request.body : {};

    const statusCode = response.statusCode;

    const constructorRef = (context as any)?.constructorRef;
    let controllerClassName = constructorRef?.name;

    if (!controllerClassName) {
      controllerClassName = (context as any)?.__proto__?.constructor.name;
    }

    this.nestLogger.setContext(controllerClassName);

    return next.handle().pipe(
      tap(() => {
        const logString = `${statusCode} ${httpMethod} ${originalUrl} +${
          Date.now() - timestampBefore
        }ms
        Headers: ${JSON.stringify(requestHeaders)}
        Cookies: ${JSON.stringify(requestCookies)}
        Params: ${JSON.stringify(requestParams)}
        Query: ${JSON.stringify(requestQuery)}
        Body: ${JSON.stringify(requestBody)}\n`;

        this.nestLogger.verbose(logString);
      }),
    );
  }
}
