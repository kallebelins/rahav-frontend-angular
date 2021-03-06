export type SortDirection = 'asc' | 'desc' | '';

export interface ISortState {
    column: string;
    direction: SortDirection;
}

export class SortState 
    implements ISortState {
    column = 'id'; // Id by default
    direction: SortDirection = 'asc'; // asc by default;
}
