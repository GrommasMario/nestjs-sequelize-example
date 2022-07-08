import {BaseListQuery} from "../../common/BaseListQuery";
import {IUserListQuery} from "../../../core/Repository/user/IUserListQuery";

export interface GetUserListConditions {
    email: string;
    phone: string;
}

export class GetUserListQuery extends BaseListQuery<Partial<GetUserListConditions>> implements IUserListQuery {
    constructor(init: GetUserListQuery) {
        super(init);
    }
}
