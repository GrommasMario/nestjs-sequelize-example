import {HttpException} from "@nestjs/common";

export class EntityNotFoundException extends HttpException {
    constructor(entity?: {new(...args: any[]): any}) {
        super(`Entity: ${entity?.name ?? ""} not found`, 404);
    }
}
