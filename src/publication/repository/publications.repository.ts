import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from '../dto/create-publication.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServerInputMediaException as ServerInputPublicationException } from '../exceptions/medias.exceptions';

@Injectable()
export class PublicationsRepository {

    constructor(private readonly prisma: PrismaService) { }

    async addMedia(body: CreatePublicationDto): Promise<void> {
        await this.prisma.publication.create({
            data: body
        })
    }

    async getAllMedias(): Promise<CreatePublicationDto[]> {
        return await this.prisma.publication.findMany();
    }

    async getMediaById(id: number): Promise<CreatePublicationDto | null> {
        return await this.prisma.publication.findFirst({
            where: {
                id
            }
        });
    }

    async updateMediaById(id: number, body: CreatePublicationDto): Promise<void> {
        await this.prisma.publication.update({
            where: { id },
            data: body
        });
    }
    async deleteMediaById(id: number) {
        await this.prisma.publication.delete({ where: { id } });
    }

    async getMediaByTitleAndUsername(body: CreatePublicationDto): Promise<CreatePublicationDto> {
        try {
            return await this.prisma.publication.findFirst({
                where: body
            })
        }
        catch (e) {
            throw new ServerInputPublicationException();
        }
    }
    async getPublicationByMediaId(id: number): Promise<CreatePublicationDto | null> {
        return await this.prisma.publication.findFirst({
             where: { mediaId: id } 
        })
    }

}