import { PrismaService } from "src/prisma/prisma.service";

export class PublicationFactory {
    private _idMidia: number;
    private _idPost: number;
    private _data: Date;

    constructor(idMidia?: number, idPost?: number, data?: Date) {
        this._idMidia = idMidia;
        this._idPost = idPost;
        this._data = data;
    }

    async criarPublicacaoDBFaker(prisma: PrismaService) {
        return await prisma.publication.create({
            data: {
                mediaId: this._idMidia,
                postId: this._idPost,
                date: this._data
            }
        });
    }

    criarPublicacaoFaker() {
        return {
            mediaId: this._idMidia,
            PostId: this._idPost,
            date: this._data
        };
    }
}
