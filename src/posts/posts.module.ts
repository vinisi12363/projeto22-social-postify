import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from '../posts/repository/posts.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { PublicationsRepository } from 'src/publication/repository/publications.repository';

@Module({
    imports: [],
    controllers: [PostsController],
    providers: [PostsService, PostsRepository, PrismaService, PublicationsRepository],
    exports: [PostsService]
})
export class PostsModule { }