import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from '../dto/create-media.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServerInputMediaException } from '../exceptions/medias.exceptions';

@Injectable()
export class MediasRepository {

    constructor(private readonly prisma: PrismaService) { }

    async addMedia(body: CreateMediaDto): Promise<void> {
        await this.prisma.media.create({
            data: body
        })
    }

    async getAllMedias(): Promise<CreateMediaDto[]> {
        return await this.prisma.media.findMany();
    }

    async getMediaById(id: number): Promise<CreateMediaDto | null> {
        return await this.prisma.media.findFirst({
            where: {
                id
            }
        });
    }

    async updateMediaById(id: number, body: CreateMediaDto): Promise<void> {
        await this.prisma.media.update({
            where: { id },
            data: body
        });
    }
    async deleteMediaById(id: number) {
        await this.prisma.media.delete({ where: { id } });
    }

    async getMediaByTitleAndUsername(body: CreateMediaDto): Promise<CreateMediaDto> {
        try {
            return await this.prisma.media.findFirst({
                where: body
            })
        }
        catch (e) {
            throw new ServerInputMediaException();
        }
    }


}