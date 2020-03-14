import {EventEmitter} from 'events';
import appDispatcher, { AppDispatcher } from '../dispatcher';
import { Target } from '../types/target';
import { Task } from '../types/task';
import { Action, ActionState } from '../types/action';
import { StoreState, StoreEvent } from '../types/store';

export default class PromiseStore<TPayload> {

    protected target: Target = Target.INIT;
    protected task: Task = Task.INIT;
    protected dispatcher: AppDispatcher = appDispatcher;

    private payload : TPayload = null;
    private state: StoreState = StoreState.INIT;
    private storeEventEmitter :  EventEmitter = new EventEmitter();
    private filterFunction : (action:Action) => boolean ;
    private mapFunction : (action:Action) => TPayload ;

    constructor(target:Target, task:Task, dispatcher: AppDispatcher=appDispatcher) {

        this.filterFunction = (action) => {

            if (action.target !== this.target)
                return false;

            if (action.task !== this.task)
                return false;

            return true;
        };

        this.mapFunction = (action) => {
            return action.payload;
        };

        this.dispatcher.register( (action) => this.actionHandler(action) );

    }

    get(mapFunction : (payload:any) => any = (payload) => payload ) {
        return mapFunction(this.payload);
    }

    on(event: string | symbol, listener: (...args: any[]) => void) {
        this.storeEventEmitter.on(event, listener);
    }

    removeListener(event: string | symbol, listener: (...args: any[]) => void) {
        this.storeEventEmitter.removeListener(event, listener);
    }

    set filter ( filterFunction : (action:Action) => boolean ) {
        this.filterFunction = filterFunction.bind(this);
    }

    set map( mapFunction : (action:Action) => TPayload ) {
        this.mapFunction = mapFunction.bind(this);
    }

    private actionHandler(action:Action) {

        if (!this.filterFunction(action))
            return false;

        switch(action.state) {
            case ActionState.STARTED:
                this.payload = null;
                this.state = StoreState.PENDING;
                this.storeEventEmitter.emit(StoreEvent.CHANGE, action);
                return;

            case ActionState.FULFILLED:
                this.payload = this.mapFunction(action);
                this.state = StoreState.SUCCESS;
                this.storeEventEmitter.emit(StoreEvent.CHANGE, action);
                return;

            case ActionState.REJECTED:
                this.state = StoreState.ERROR;
                this.storeEventEmitter.emit(StoreEvent.ERROR, action);
                return;

            default:
                this.storeEventEmitter.emit(StoreEvent.IGNORE, action);
                return;
        }
    }

}