import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediasRepository } from './repository/medias.repository';
import { PublicationsRepository } from 'src/publication/repository/publications.repository';
import {ConflictMediaException, ForbiddenMediaException, NotFoundMediaException} from './exceptions/medias.exceptions'


@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository: MediasRepository, private readonly publicationsRepository: PublicationsRepository) { }
  
  async create(body: CreateMediaDto): Promise<void>{
    const existMedia = await this.mediasRepository.getMediaByTitleAndUsername(body);
    if(!existMedia){
      await this.mediasRepository.addMedia(body);
    }else {
      throw new ConflictMediaException(body.title, body.username);
    }
    
  }

  async findAll(): Promise <CreateMediaDto[]> {
    return await this.mediasRepository.getAllMedias();
  }

  async findMediaById(id: number): Promise <CreateMediaDto> {
    const media = await this.mediasRepository.getMediaById(id)
    if(media){
      return media;
    } else{
      throw new NotFoundMediaException(id);
    }
  
  }

  async updateMediaById(id: number, body: CreateMediaDto): Promise<void> {
    const existMedia = await this.mediasRepository.getMediaByTitleAndUsername(body);
    if (!existMedia) {
        await this.mediasRepository.updateMediaById(id, body);
    }
    else {
        throw new ConflictMediaException(body.title, body.username);
    }
    
  }

  async removeMediaById(id: number): Promise <void> {
    const publicationMediaIdExists = await this.publicationsRepository.getPublicationByMediaId(id);
        if (publicationMediaIdExists) {
            throw new ForbiddenMediaException(id, publicationMediaIdExists.id);
        }else {
          await this.mediasRepository.deleteMediaById(id);
        }
      
    }
  }

