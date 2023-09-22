export class FileUtils {
    public static getBase64(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', () =>
                resolve(reader.result!.toString())
            );
            reader.addEventListener('error', () =>
                reject(
                    new Error('An error occurred when trying to get the base64')
                )
            );
        });
    }

    public static isBase64(str?: string | null): boolean {
        if (!str) return false;
        if (str === '' || str.trim() === '') return false;

        return str.includes('data:image');
    }
}
