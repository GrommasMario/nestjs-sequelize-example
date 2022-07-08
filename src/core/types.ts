export type PartPartial<T, K extends keyof T = never> = Pick<
    T,
    Exclude<keyof T, K>
    > &
    Partial<Pick<T, K>>;
