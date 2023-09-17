export interface UserAdminModel {
    id?: number;
    email: string;
    code: string;
    fullName: string;
    status: number;
    password?: string;
}
