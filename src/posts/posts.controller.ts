import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get("health")
  getHealthPotsController(): string {
      return this.postsService.getHealthPosts();
  }
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.getPostById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    return this.postsService.updatePostById(Number(id), updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.deletePostById(Number(id));
  }
}
