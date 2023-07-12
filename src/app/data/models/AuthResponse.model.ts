import { UserAdminModel } from './UserAdmin.model';

export interface AuthResponse {
    user: UserAdminModel;
    token: string;
    expirationToken: string;
}
