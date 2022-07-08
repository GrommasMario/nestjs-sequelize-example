import {INestApplication, VersioningType} from "@nestjs/common";
import {MediatrResolver} from "../application/common/Mediator";
import {NestFactory} from "@nestjs/core";
import {StartUpModule} from "./StartUpModule";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

class Startup {
    private app!: INestApplication;

    private async initial() {
        this.app = await NestFactory.create(StartUpModule);
        this.app.setGlobalPrefix("api")
        this.app.enableVersioning({type: VersioningType.URI, defaultVersion: "1"})
    }

    private async run(){
        await this.app.listen(3000);
    }

    private async useMediator() {
        await MediatrResolver.RegisterAll(this.app);
    }

    private useSwagger() {
        SwaggerModule.setup(
            'docs',
            this.app,
            SwaggerModule.createDocument(
                this.app,
                new DocumentBuilder()
                    .setTitle('Job Test')
                    .setVersion('1')
                    .addBearerAuth({ type: 'http', in: 'header', description: 'Use for request with access token'})
                    .addBasicAuth({ type: 'http', in: 'header', description: 'Use for get access token'})
                    .build(),
            ),
        );
    }

    async bootstrap() {
        await this.initial();
        await this.useSwagger();
        await this.useMediator();
        await this.run();
    }
}

new Startup().bootstrap().catch(console.error);
