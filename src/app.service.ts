import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(name = 'World!', age = undefined, query = {}): string {
    const { place } = query as any;
    return `Hello ${name}!${age ? ` You' ${age} years old!` : ''}${
      place ? ` You're from ${place}` : ''
    }`;
  }
}
