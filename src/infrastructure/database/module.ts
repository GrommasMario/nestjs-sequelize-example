import {Global, Module} from "@nestjs/common";
import {AllRepositoryInjectors} from "./RepositoryInjector";
import {SequelizeModule} from "./configs/base";

@Global()
@Module({providers: AllRepositoryInjectors, exports: AllRepositoryInjectors,
    imports:[SequelizeModule]
})
export class DatabaseModule {}
