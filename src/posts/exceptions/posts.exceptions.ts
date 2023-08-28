import { HttpException, HttpStatus } from "@nestjs/common";

export class ConflictPostException extends HttpException {
    constructor(title?: string, username?: string) {
        let message = `Already exists in the database: title: ${title}, username: ${username}`;
        super(message, HttpStatus.CONFLICT);
    }
}

export class ServerInputPostException extends HttpException {
    constructor() {
        let message = `Server error while inserting media data`;
        super(message, HttpStatus.BAD_REQUEST);
    }
}

export class NotFoundPostException extends HttpException {
    constructor(id: number) {
        let message = `Post ${id} not found`;
        super(message, HttpStatus.NOT_FOUND);
    }
}

export class ForbiddenPostException extends HttpException {
    constructor(id: number, publicationId: number) {
        let message = `Post${id} cannot be deleted as it is in publication ${publicationId}`;
        super(message, HttpStatus.FORBIDDEN);
    }
}
