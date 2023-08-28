import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from '../dto/create-publication.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServerInputPublicationException } from '../exceptions/publications.exceptions';

@Injectable()
export class PublicationsRepository {

    constructor(private readonly prisma: PrismaService) { }

    async addNewPublication(body: CreatePublicationDto): Promise<CreatePublicationDto> {
        try {
            return await this.prisma.publication.create({ data: body })
        }
        catch (e) {
            console.log("e.message", e.message)
            throw new ServerInputPublicationException;
        }
    }

    async getAllPublication(publish?: boolean, after?: Date): Promise<CreatePublicationDto[]> {
        if (publish === true && after) {
            return await this.prisma.publication.findMany({
                where: {
                    date: {
                        lt: new Date(),
                        ...({ gt: new Date(after) }),
                    }
                }
            })
        }
        else if (publish === false && after) {
            return await this.prisma.publication.findMany({
                where: {
                    date: {
                        gt: new Date(after) > new Date() ? new Date(after) : new Date(),
                    }
                }
            })
        }
        else if (publish === true) {
            return await this.prisma.publication.findMany({
                where: {
                    date: {
                        lt: new Date()
                    }
                }
            })
        }
        else if (publish === false) {
            return await this.prisma.publication.findMany({
                where: {
                    date: {
                        gt: new Date()
                    }
                }
            })
        }
        else if (after) {
            return await this.prisma.publication.findMany({
                where: {
                    date: {
                        gt: new Date(after)
                    }
                }
            })
        }
        else {
            return await this.prisma.publication.findMany();
        }
    }

    async getPublicationById(id: number): Promise<CreatePublicationDto> {
        return await this.prisma.publication.findFirst({
            where: {
                id: id
            }
        })
    }

    async updatePublication(id: number, body: CreatePublicationDto): Promise<void> {
        try {
            await this.prisma.publication.update({
                where: { id },
                data: body
            })
        }
        catch (e) {
            throw new ServerInputPublicationException();
        }
    }

    async deletePublicationById(id: number) {
        await this.prisma.publication.delete({
            where: {
                id
            }
        })
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
    async getPublicationByPostId(id: number): Promise<CreatePublicationDto | null> {
        return await this.prisma.publication.findFirst({
            where: { postId: id }
        })
    }

}