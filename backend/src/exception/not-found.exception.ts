
import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/core";


export class NotFoundException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.NOT_FOUND);
    }
}