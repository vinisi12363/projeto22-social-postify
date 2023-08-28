import { Module } from '@nestjs/common';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { MediasModule } from 'src/medias/medias.module';
import { PostsModule } from 'src/posts/posts.module';
import { PublicationsRepository } from './repository/publications.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [MediasModule, PostsModule],
    controllers: [PublicationController],
    providers: [PublicationService, PrismaService, PublicationsRepository],
    exports: [PublicationsRepository]
})
export class PublicationModule { }