export enum StoreState {
    INIT, 
    PENDING, 
    SUCCESS, 
    ERROR
}

export enum StoreEvent {
    CHANGE = 'StoreEvent:CHANGE',
    ERROR = 'StoreEvent:ERROR',
    IGNORE = 'StoreEvent:IGNORE'
}