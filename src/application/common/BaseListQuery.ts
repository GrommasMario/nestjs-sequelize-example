import {Pagination} from "./Pagination";

type BaseListQueryInit<Condition> = Partial<BaseListQuery<Condition>>

export abstract class BaseListQuery<Condition> {
    pagination: Pagination;
    filter?: Condition;

    constructor(init: BaseListQueryInit<Condition>)
    {
        this.pagination = init.pagination ?? new Pagination();
        this.filter = init.filter;
    }
}
