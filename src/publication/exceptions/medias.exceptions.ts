import { HttpException, HttpStatus } from "@nestjs/common";

export class ConflictMediaException extends HttpException {
    constructor(title?: string, username?: string) {
        let message = `Already exists in the database: title: ${title}, username: ${username}`;
        super(message, HttpStatus.CONFLICT);
    }
}

export class ServerInputMediaException extends HttpException {
    constructor() {
        let message = `Server error while inserting media data`;
        super(message, HttpStatus.BAD_REQUEST);
    }
}

export class NotFoundMediaException extends HttpException {
    constructor(id: number) {
        let message = `Media ${id} not found`;
        super(message, HttpStatus.NOT_FOUND);
    }
}

export class ForbiddenMediaException extends HttpException {
    constructor(mediaId: number, publicationId: number) {
        let message = `Media ${mediaId} cannot be deleted as it is in publication ${publicationId}`;
        super(message, HttpStatus.FORBIDDEN);
    }
}
