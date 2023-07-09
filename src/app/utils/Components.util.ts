import { Type } from '@angular/core';

export interface CustomHeader {
    title: string;
    dataIndex?: string;
    render?: Type<any>;
}
