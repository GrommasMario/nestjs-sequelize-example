import {Global, INestApplicationContext, Module} from "@nestjs/common";
import {IValidationSchema} from "../../api/validations/base/IValidationSchema";
import {JoiValidationPipe} from "../../api/pipes/JoiValidationPipe";

export interface IHandler<I, O>{
    handle(request: I): Promise<O>
}

export function Handler(cls: { new(...args: any[]): object }){
    return function _(Base: any) {
        MediatrResolver.add(cls.name, Base)
        return Base;
    };
}

export class Mediatr {
    send<R = unknown>(data: unknown, validation?: IValidationSchema<any>): Promise<R> {
        if(validation){
            data = new JoiValidationPipe(validation).transform(data);
        }
        let name = Object.getPrototypeOf(data).constructor.name
        if(name === "Object") {
            throw new Error('Mediator need Class Instance');
        }

        const instance = MediatrResolver.get<unknown, R>(Object.getPrototypeOf(data).constructor.name)

        if(instance){
            return instance.handle(data);
        }

        return Promise.resolve(null) as never;
    }
}

export class MediatrResolver {

    static handlers: Map<string, Function> = new Map<string, any>;
    static handlersInstance: Record<string, unknown> = {};

    static async RegisterAll(context: INestApplicationContext){
        await Promise.all(Array.from(MediatrResolver.handlers).map(async ([key,value]) => {

            MediatrResolver.handlersInstance[key] = await context.resolve<IHandler<unknown, unknown>>(value);
        }))
    }

    static add(action: string, handler: any){
        MediatrResolver.handlers.set(action, handler);
    }

    static get<T, O>(name: string): IHandler<T, O> | undefined {
        return MediatrResolver.handlersInstance[name] as IHandler<T, O>;
    }
}

const mediatrProvider = {provide: Mediatr, useValue: new Mediatr()};

@Global()
@Module({providers: [mediatrProvider], exports: [mediatrProvider]})
export class MediatrModule {}

