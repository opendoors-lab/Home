import { Global, Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { AuditService } from './audit.service';
import { MailerService } from './mailer.service';
import { RevalidationService } from './revalidation.service';

@Global()
@Module({
  providers: [PermissionsService, AuditService, MailerService, RevalidationService],
  exports: [PermissionsService, AuditService, MailerService, RevalidationService],
})
export class CommonServicesModule {}
