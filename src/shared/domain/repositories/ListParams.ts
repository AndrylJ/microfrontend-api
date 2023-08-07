export interface SortParam {
    col: string;
    val: 'asc' | 'desc';
 }
 
export interface PaginationParams {
    perPage: number,
    page: number,
}
 
export interface ListParams {
    id?: number;
    search?: string | number;
    sort?: SortParam;
    pagination?: PaginationParams
}
