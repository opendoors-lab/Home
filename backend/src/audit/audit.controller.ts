import { Controller, Get, Query } from '@nestjs/common';
import { PERMISSIONS } from '@company/shared';
import { RequirePermissions } from '../common/decorators/require-permissions.decorator';
import { AuditService } from '../common/services/audit.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('audit-log')
export class AuditController {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  @RequirePermissions(PERMISSIONS.VIEW_AUDIT_LOG)
  @Get()
  async list(@Query('limit') limit?: string) {
    const take = limit ? parseInt(limit, 10) : 100;
    const logs = await this.prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take,
    });
    return logs.map((l) => ({
      id: l.id,
      actorId: l.actorId,
      action: l.action,
      targetType: l.targetType,
      targetId: l.targetId,
      metadata: l.metadata as Record<string, unknown> | null,
      createdAt: l.createdAt.toISOString(),
    }));
  }
}
