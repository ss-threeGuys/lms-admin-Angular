
export default interface CrudService<TPayload> {

    create(payload: TPayload): void;

    retrieve(): void;

    update(payload: TPayload): void;

    delete(payload: TPayload): void;

}