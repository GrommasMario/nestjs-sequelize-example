import {BadRequestException, PipeTransform} from "@nestjs/common";
import * as Joi from "joi";

export class JoiValidationPipe<T = any> implements PipeTransform{
    constructor(private readonly validation: Record<string, Joi.AnySchema>, private serialize?: {new(init: T): any}) {}
    transform(value: any): any {
        const pass = Joi.object(this.validation).validate(value, {convert: true});
        if(pass.error){
            throw new BadRequestException(pass.error.message);
        }

        if(this.serialize){
            return new this.serialize(pass.value as T);
        }

        return pass.value;
    }
}
