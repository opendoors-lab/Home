import { Controller, Get } from '@nestjs/common';
import { PERMISSIONS } from '@company/shared';
import { Public } from './common/decorators/public.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  getHealth() {
    return this.appService.getHealth();
  }

  @Public()
  @Get('permissions/catalog')
  getPermissionCatalog() {
    return { permissions: PERMISSIONS };
  }
}
