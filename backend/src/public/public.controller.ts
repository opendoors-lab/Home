import { Controller, Get, Param, Query } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { PublicService } from './public.service';

@Controller('public/posts')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Public()
  @Get('latest')
  latest(@Query('limit') limit?: string) {
    return this.publicService.latest(limit ? parseInt(limit, 10) : 3);
  }

  @Public()
  @Get()
  list(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.publicService.list(
      page ? parseInt(page, 10) : 1,
      pageSize ? parseInt(pageSize, 10) : 12,
    );
  }

  @Public()
  @Get(':slug')
  bySlug(@Param('slug') slug: string) {
    return this.publicService.bySlug(slug);
  }
}
