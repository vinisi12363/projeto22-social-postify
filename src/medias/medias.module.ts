import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { MediasRepository } from './repository/medias.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { PublicationsRepository } from 'src/publication/repository/publications.repository';

@Module({
  controllers: [MediasController],
  providers: [MediasService, MediasRepository, PrismaService,PublicationsRepository],
  exports: [MediasService]
})
export class MediasModule {}
