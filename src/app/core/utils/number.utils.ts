import { GetOnlyNumbers } from './RegEx.utils';

export class NumberUtils {
    public static formatMoney(value?: number): string {
        if (!value) return '--';

        return new Intl.NumberFormat('en', {
            currencySign: 'accounting',
            style: 'currency',
            currency: 'USD',
        }).format(value);
    }

    public static getOnlyNumbers(value?: string): number | null {
        if (value) {
            value = value.trim();
            if (value !== '')
                return +(value.match(GetOnlyNumbers) || [])?.join('') ?? 0;
        }

        return null;
    }
}
