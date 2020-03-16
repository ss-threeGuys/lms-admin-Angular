export enum StoreState {
    INIT = 'INIT', 
    PENDING = 'PENDING', 
    SUCCESS = 'SUCCESS', 
    ERROR = 'ERROR'
}

export enum StoreEvent {
    CHANGE = 'StoreEvent:CHANGE',
    ERROR = 'StoreEvent:ERROR',
    IGNORE = 'StoreEvent:IGNORE'
}