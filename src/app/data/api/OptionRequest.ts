type methods = 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'GET';

export interface OptionRequest<T extends Object> {
    method: methods;
    path: string;
    params?: Record<string, string>;
    data?: T;
}
