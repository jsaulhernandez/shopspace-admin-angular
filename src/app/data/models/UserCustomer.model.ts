import { CustomerModel } from './Customer.model';

export interface UserCustomerModel {
    id?: number;
    userName: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    verifiedEmail: number;
    customer: CustomerModel;
}
