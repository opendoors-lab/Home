import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CommonServicesModule } from '../common/services/common-services.module';
import { PrismaModule } from '../prisma/prisma.module';
import { StartupService } from './startup.service';

@Module({
  imports: [PrismaModule, CommonServicesModule, AuthModule],
  providers: [StartupService],
})
export class StartupModule {}
