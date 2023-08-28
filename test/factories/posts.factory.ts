import { PrismaService } from "src/prisma/prisma.service";
import { faker } from "@faker-js/faker";

export class PostFactory {
    private postTitle: string;
    private postText: string;
    private postImage: string;

    constructor(postTitle?: string, postText?: string, postImage?: string) {
        this.postTitle = postTitle;
        this.postText = postText;
        this.postImage = postImage;
    }

    async criarPostComImagemDBFaker(prisma: PrismaService) {
        return await prisma.post.create({
            data: {
                title: faker.company.name(),
                text: faker.lorem.words(10),
                image: `https://picsum.photos/${faker.number.int({ max: 500, min: 200 })}`
            }
        });
    }

    async criarPostComImagemFaker() {
        return {
            title: faker.company.name(),
            text: faker.lorem.words(10),
            image: `https://picsum.photos/${faker.number.int({ max: 500, min: 200 })}`
        };
    }

    async criarPostComImagemPersonalizada(prisma: PrismaService) {
        return await prisma.post.create({
            data: {
                title: this.postTitle,
                text: this.postText,
                image: `https://picsum.photos/${faker.number.int({ max: 500, min: 200 })}`
            }
        });
    }

    async criarVariosPostsComImagemDBFaker(prisma: PrismaService) {
        return await prisma.post.createMany({
            data: [
                {
                    title: faker.company.name(),
                    text: faker.lorem.words(10),
                    image: `https://picsum.photos/${faker.number.int({ max: 500, min: 200 })}`
                },
                {
                    title: faker.company.name(),
                    text: faker.lorem.words(10),
                    image: `https://picsum.photos/${faker.number.int({ max: 500, min: 200 })}`
                },
            ],
        });
    }

    async criarPostSemImagemDBFaker(prisma: PrismaService) {
        return await prisma.post.create({
            data: {
                title: faker.company.name(),
                text: faker.lorem.words(10)
            }
        });
    }

    async criarPostSemImagemFaker() {
        return {
            title: faker.company.name(),
            text: faker.lorem.words(10)
        };
    }

    async criarPostSemImagemPersonalizada(prisma: PrismaService) {
        return await prisma.post.create({
            data: {
                title: this.postTitle,
                text: this.postText
            }
        });
    }

    async criarVariosPostsSemImagemDBFaker(prisma: PrismaService) {
        return await prisma.post.createMany({
            data: [
                {
                    title: faker.company.name(),
                    text: faker.lorem.words(10),
                },
                {
                    title: faker.company.name(),
                    text: faker.lorem.words(10),
                },
            ],
        });
    }
}
