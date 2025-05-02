export class Page<T> {

    public content: T[] = [];

    public pageSize: number = 10;

    public pageNumber: number = 0;

    public totalPages: number = 0;

    public totalElements: number = 0;

}
