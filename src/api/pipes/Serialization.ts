import {PipeTransform} from "@nestjs/common";

export class SerializationPipe<T = unknown> implements PipeTransform {
    constructor(private serializationClass: {new(init: T): any}) {}
    transform(value: T): unknown {
        return new this.serializationClass(value);
    }
}


