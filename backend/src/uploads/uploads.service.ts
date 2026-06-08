import {
  BadRequestException,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import * as path from 'path';

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

@Injectable()
export class UploadsService implements OnModuleInit {
  private readonly uploadDir: string;
  private publicBaseUrl!: string;

  constructor(private readonly config: ConfigService) {
    this.uploadDir = this.resolveUploadDir();
  }

  async onModuleInit() {
    await mkdir(this.uploadDir, { recursive: true });

    const apiUrl =
      this.config.get<string>('API_PUBLIC_URL') ??
      `http://localhost:${this.config.get('PORT') ?? 4000}`;
    this.publicBaseUrl = apiUrl.replace(/\/$/, '');
  }

  getUploadDir() {
    return this.uploadDir;
  }

  private resolveUploadDir() {
    const configured = this.config.get<string>('UPLOAD_DIR');
    if (configured) {
      return path.isAbsolute(configured)
        ? configured
        : path.resolve(process.cwd(), configured);
    }
    return path.resolve(process.cwd(), 'upload');
  }

  async saveFile(
    file: Express.Multer.File | undefined,
  ): Promise<{ publicUrl: string; filename: string }> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    if (!ALLOWED_MIME.has(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }
    if (file.size > MAX_SIZE) {
      throw new BadRequestException('File too large (max 5MB)');
    }

    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${randomUUID()}${ext}`;
    const filepath = path.join(this.uploadDir, filename);

    await writeFile(filepath, file.buffer);

    return {
      filename,
      publicUrl: `${this.publicBaseUrl}/upload/${filename}`,
    };
  }
}
