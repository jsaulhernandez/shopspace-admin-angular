interface CustomPagination {
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    numberOfElements: number;
}

export interface CustomResponse<M extends Object> {
    isSuccess: boolean;
    isError: boolean;
    message: string;
    data?: M;
    page?: CustomPagination;
}
