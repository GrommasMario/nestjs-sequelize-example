export interface IUserCreate {
    id: string;
    name: string | null;
    phone: string | null;
    email: string | null;
    passwordHash: string;
}
