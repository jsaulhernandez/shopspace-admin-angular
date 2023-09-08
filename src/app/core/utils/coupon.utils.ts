import * as coupon from 'voucher-code-generator';

export class CouponUtils {
    public static generate(
        charset: 'numbers' | 'alphabetic' | 'alphanumeric' = 'alphanumeric',
        length: number = 6,
        count: number = 1
    ): string {
        const result: string[] = coupon.generate({
            length,
            count,
            charset: coupon.charset(charset),
        });

        return result[0] ?? null;
    }
}
