import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'company-blog-api',
      timestamp: new Date().toISOString(),
    };
  }
}
