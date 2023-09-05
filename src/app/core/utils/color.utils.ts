export class Color {
    public static hexToRgba(value: string, opacity: number = 1): string {
        let hex = value.replace('#', '');

        if (hex.length === 3)
            hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        if (opacity > 1 && opacity <= 100) opacity = opacity / 100;

        return `rgba(${r},${g},${b},${opacity})`;
    }

    public static rgbaToHex(value: string, forceRemoveAlpha = false): string {
        return (
            '#' +
            value
                .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
                .split(',') // splits them at ","
                .filter((string, index) => !forceRemoveAlpha || index !== 3)
                .map((string) => parseFloat(string)) // Converts them to numbers
                .map((number, index) =>
                    index === 3 ? Math.round(number * 255) : number
                ) // Converts alpha to 255 number
                .map((number) => number.toString(16)) // Converts numbers to hex
                .map((string) => (string.length === 1 ? '0' + string : string)) // Adds 0 when length of one number is 1
                .join('')
        );
    }

    public static getValuesFromRgba(rgba: string): RegExpMatchArray | null {
        // => /[\.\d]+/g
        return rgba.match(/[0-9.]+/gi);
    }
}
