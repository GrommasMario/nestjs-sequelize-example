import {IListQuery} from "../IListQuery";

export interface IUserListQuery extends IListQuery {
    filter?:{
        email?: string;
        phone?: string;
    }
}
