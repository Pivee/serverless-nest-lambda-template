import { Injectable } from '@nestjs/common';
import { LambdaRequest } from './aws';

@Injectable()
export class AppService {
  getEvent(request: LambdaRequest) {
    return request?.apiGateway?.event;
  }

  getContext(request: LambdaRequest) {
    return request?.apiGateway?.context;
  }
}
