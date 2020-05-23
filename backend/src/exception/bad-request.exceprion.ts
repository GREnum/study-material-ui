
import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/core";


export class BadRequestException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}