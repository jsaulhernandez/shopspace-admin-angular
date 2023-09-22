export class FileUtils {
    public static getBase64(
        file: File,
        callback: (base64: string) => void
    ): void {
        const reader = new FileReader();
        reader.addEventListener('load', () =>
            callback(reader.result!.toString())
        );
        reader.readAsDataURL(file);
    }
}
