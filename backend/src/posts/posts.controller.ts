import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PERMISSIONS } from '@company/shared';
import { RequireAnyPermissions } from '../common/decorators/require-any-permissions.decorator';
import { RequirePermissions } from '../common/decorators/require-permissions.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthUser } from '../common/types/auth-user';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RejectPostDto } from './dto/reject-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @RequirePermissions(PERMISSIONS.CREATE_POST)
  @Post()
  create(@Body() dto: CreatePostDto, @CurrentUser() user: AuthUser) {
    return this.postsService.create(dto, user);
  }

  @RequirePermissions(PERMISSIONS.CREATE_POST)
  @Get('mine')
  listMine(@CurrentUser() user: AuthUser) {
    return this.postsService.listMine(user);
  }

  @RequirePermissions(PERMISSIONS.EDIT_ANY_POST)
  @Get()
  listAll() {
    return this.postsService.listAll();
  }

  @RequirePermissions(PERMISSIONS.VIEW_PENDING_QUEUE)
  @Get('pending')
  listPending() {
    return this.postsService.listPending();
  }

  @RequireAnyPermissions(
    PERMISSIONS.CREATE_POST,
    PERMISSIONS.EDIT_OWN_POST,
    PERMISSIONS.EDIT_ANY_POST,
    PERMISSIONS.VIEW_PENDING_QUEUE,
    PERMISSIONS.DELETE_POST,
  )
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.postsService.getById(id);
  }

  @RequireAnyPermissions(PERMISSIONS.EDIT_OWN_POST, PERMISSIONS.EDIT_ANY_POST)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.postsService.update(id, dto, user);
  }

  @RequirePermissions(PERMISSIONS.DELETE_POST)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }

  @RequirePermissions(PERMISSIONS.SUBMIT_POST)
  @Post(':id/submit')
  submit(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.postsService.submit(id, user);
  }

  @RequirePermissions(PERMISSIONS.APPROVE_POST)
  @Post(':id/approve')
  approve(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.postsService.approve(id, user);
  }

  @RequirePermissions(PERMISSIONS.REJECT_POST)
  @Post(':id/reject')
  reject(
    @Param('id') id: string,
    @Body() dto: RejectPostDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.postsService.reject(id, dto.comment, user);
  }
}
