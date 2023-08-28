import { PrismaService } from "src/prisma/prisma.service";
import { faker } from "@faker-js/faker";

export class MediaFactory {
    private mediaTitle: string;
    private mediaUsername: string;

    constructor(mediaTitle?: string, mediaUsername?: string) {
        this.mediaTitle = mediaTitle;
        this.mediaUsername = mediaUsername;
    }

    async criarMediaDBFaker(prisma: PrismaService) {
        return await prisma.media.create({
            data: {
                title: faker.company.name(),
                username: faker.internet.userName()
            }
        });
    }

    async criarMediaFaker() {
        return {
            title: faker.company.name(),
            username: faker.internet.userName()
        };
    }

    async criarMediaPersonalizada(prisma: PrismaService) {
        return await prisma.media.create({
            data: {
                title: this.mediaTitle,
                username: this.mediaUsername
            }
        });
    }

    async criarVariasMediasDBFaker(prisma: PrismaService) {
        return await prisma.media.createMany({
            data: [
                {
                    title: faker.company.name(),
                    username: faker.internet.userName(),
                },
                {
                    title: faker.company.name(),
                    username: faker.internet.userName(),
                },
            ],
        });
    }
}

