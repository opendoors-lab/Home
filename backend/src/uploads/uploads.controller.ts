import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { PERMISSIONS } from '@company/shared';
import { RequirePermissions } from '../common/decorators/require-permissions.decorator';
import { UploadsService } from './uploads.service';

const MAX_SIZE = 5 * 1024 * 1024;

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @RequirePermissions(PERMISSIONS.CREATE_POST)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_SIZE },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.saveFile(file);
  }
}
