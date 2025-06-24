export interface FetchDataType {
    [key: string]: string;
}

export interface PaginationStore {
    pagination: number;
    setPagination: (page: number) => void;
}