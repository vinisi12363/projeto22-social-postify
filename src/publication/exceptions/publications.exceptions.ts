import { HttpException, HttpStatus } from "@nestjs/common";

export class ConflictMediaException extends HttpException {
    constructor(title?: string, username?: string) {
        let message = `Already exists in the database: title: ${title}, username: ${username}`;
        super(message, HttpStatus.CONFLICT);
    }
}

export class InputFilterPublicationException extends HttpException {
    constructor() {
        const message = `Filter(s) are in incorrrect(s) format(s)!`;
        super(message, HttpStatus.BAD_REQUEST);
    }
}

export class ServerInputPublicationException  extends HttpException {
    constructor() {
        let message = `Server error while inserting media data`;
        super(message, HttpStatus.BAD_REQUEST);
    }
}

export class NotFoundPublicationException  extends HttpException {
    constructor(id: number) {
        let message = `Media ${id} not found`;
        super(message, HttpStatus.NOT_FOUND);
    }
}

export class ForbiddenPublicationException  extends HttpException {
    constructor(id: number) {
        let message = `Publication ${id} already published!`;
        super(message, HttpStatus.FORBIDDEN);
    }
}
export class ForbiddenDatePublicationException extends HttpException {
    constructor(date: Date) {
        const message = `invalid DateTime!`;
        super(message, HttpStatus.FORBIDDEN);
    }
}