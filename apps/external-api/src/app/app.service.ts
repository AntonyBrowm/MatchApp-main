import { Injectable } from '@nestjs/common';
import { definitions } from '@enroute/definitions';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to backend!' + ' ' + definitions() };
  }
}
