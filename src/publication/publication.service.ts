import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { MediasService } from 'src/medias/medias.service';
import { PostsService } from 'src/posts/posts.service';
import { PublicationsRepository } from './repository/publications.repository';
import { ForbiddenPublicationException,
         ForbiddenDatePublicationException,
         InputFilterPublicationException,
         NotFoundPublicationException
       } from './exceptions/publications.exceptions';

@Injectable()
export class PublicationService {
  constructor(
    private readonly mediasService: MediasService,
    private readonly postsService: PostsService,
    private readonly publicationRepository: PublicationsRepository
  ) { }

  async addNewPublication(body: CreatePublicationDto): Promise<void> {
    await this.mediasService.findMediaById(body.mediaId);
    await this.postsService.getPostById(body.postId);
    body.date = new Date(body.date);
    if (body.date < new Date()) {
        throw new ForbiddenDatePublicationException(body.date);
    }
     await this.publicationRepository.addNewPublication(body);
  }

  async getAllPublications(publish?: string, afterDate?: Date): Promise<CreatePublicationDto[]> {
      if (publish !== null && publish !== "true" && publish !== "false") {
          throw new InputFilterPublicationException();
      }
      if ((new Date(afterDate).toString() === "Invalid Date")) {
          throw new InputFilterPublicationException();
      }
      const boolean = JSON.parse(publish);
      return await this.publicationRepository.getAllPublication(boolean, afterDate);
  }

  async getPublicationById(id: number): Promise<CreatePublicationDto> {
      const publicationExists = await this.publicationRepository.getPublicationById(id);
      if (!publicationExists) {
          throw new NotFoundPublicationException(id);
      }
      return publicationExists;
  }

  async updatePublication(id: number, body: CreatePublicationDto): Promise<void> {
      const publicationExits = await this.getPublicationById(id);
      if (new Date(body.date) < new Date()) {
          throw new ForbiddenDatePublicationException(body.date);
      }
      if (new Date(publicationExits.date) < new Date()) {
          throw new ForbiddenPublicationException(id);
      }
      await this.mediasService.findMediaById(body.mediaId);
      await this.postsService.getPostById(body.postId);
      body.date = new Date(body.date)
      await this.publicationRepository.updatePublication(id, body);
  }

  async deletePublicationById(id: number): Promise<void> {
      await this.getPublicationById(id);
      await this.publicationRepository.deletePublicationById(id);
  }

}
