import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RevalidationService {
  private readonly logger = new Logger(RevalidationService.name);

  constructor(private readonly config: ConfigService) {}

  async revalidateBlog() {
    const frontendUrl = this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';
    const secret = this.config.get<string>('REVALIDATE_SECRET');
    if (!secret) {
      this.logger.warn('REVALIDATE_SECRET not set; skipping revalidation');
      return;
    }

    try {
      const res = await fetch(
        `${frontendUrl}/api/revalidate?secret=${encodeURIComponent(secret)}`,
        { method: 'POST' },
      );
      if (!res.ok) {
        this.logger.warn(`Revalidation failed: ${res.status}`);
      }
    } catch (err) {
      this.logger.warn(`Revalidation error: ${err}`);
    }
  }
}
