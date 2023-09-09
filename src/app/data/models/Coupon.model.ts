export interface CouponModel {
    id?: number;
    code: string;
    off: number;
    createdAt: Date;
    expireAt: Date;
    status: number;
}
