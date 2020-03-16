
export default interface CrudService<TPayload> {

    create(payload: TPayload): void;

    retrieve(sortField:string, sortOrder:number): void;

    update(payload: TPayload): void;

    delete(payload: TPayload): void;

}