export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Slice {
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface Page<T extends Object> extends Slice {
    content: T;
    pageable: Pageable;
}

export interface ResponseAdmin<T extends Object> {
    status: string;
    statusCode: string;
    statusMessage: string;
    response: T;
}
