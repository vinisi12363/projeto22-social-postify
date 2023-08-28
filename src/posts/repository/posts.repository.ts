import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ServerInputPostException } from '../exceptions/posts.exceptions';

@Injectable()
export class PostsRepository {

    constructor(private readonly prisma: PrismaService) { }

    async addNewPost(body: CreatePostDto): Promise<void> {
        try {
            await this.prisma.post.create({ data: body })
        }
        catch (e) {
            throw new ServerInputPostException();
        }
    }

    async getAllPosts(): Promise<CreatePostDto[]> {
        return await this.prisma.post.findMany();
    }

    async getPostById(id: number): Promise<CreatePostDto | null> {
        return await this.prisma.post.findFirst({
            where: { id }
        })
    }

    async updatePostById(id: number, postBody: CreatePostDto): Promise<void> {
        try {
            await this.prisma.post.update({
                where: { id },
                data: postBody
            })
        }
        catch {
            throw new ServerInputPostException();
        }
    }

    async deletePostById(id: number): Promise<void> {
        await this.prisma.post.delete({
            where: { id }
        })
    }


}