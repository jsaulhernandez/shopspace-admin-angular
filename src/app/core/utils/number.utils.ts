export class NumberUtils {
    public static formatMoney(value?: number): string {
        if (!value) return '--';

        return new Intl.NumberFormat('en', {
            currencySign: 'accounting',
            style: 'currency',
            currency: 'USD',
        }).format(value);
    }
}
