export interface OptionRequest<T extends Object> {
    path: string;
    params?: Record<string, string>;
    data?: T;
}
