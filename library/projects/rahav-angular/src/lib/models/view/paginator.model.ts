export const PageSizes = [3, 7, 15, 25, 50, 100];

export interface IPaginatorState {
    page: number;
    pageSize: number;
    total: number;
}

export class PaginatorState 
    implements IPaginatorState {
    page = 1;
    pageSize = PageSizes[3];
    total = 0;
}