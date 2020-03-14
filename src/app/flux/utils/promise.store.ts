import {EventEmitter} from 'events';
import appDispatcher, { AppDispatcher } from '../appdispatcher';
import { Target } from '../types/target';
import { Task } from '../types/task';
import { Action, ActionState } from '../types/action';
import { StoreState, StoreEvent } from '../types/store';

export default class PromiseStore<TPayload> {

    protected target: Target = Target.INIT;

    protected dispatcher: AppDispatcher = appDispatcher;

    payload : TPayload = null;

    private state: StoreState = StoreState.INIT;
    private storeEventEmitter :  EventEmitter = new EventEmitter();
    private filterFunction : (action:Action) => boolean ;
    private mapFunction : (action:Action) => TPayload ;
    private mutationFunction : (store:PromiseStore<TPayload>, action:Action, mapFunction: (action:Action) => TPayload) => void;

    constructor(target:Target, dispatcher: AppDispatcher=appDispatcher) {

        this.target = target;

        this.filterFunction = (action) => {

            if (action.target !== this.target)
                return false;

            return true;
        };

        this.mapFunction = (action) => {
            //console.log('Store', 'onPayload');
            return action.payload;
        };

        this.mutationFunction = (store, action, mapFunction) => {
            if (action.task === Task.RETRIEVE) {
                store.payload = mapFunction(action);
            }
        };

        this.dispatcher.register( (action) => this.actionHandler(action) );

    }

    get(mapFunction : (payload:any) => any = (payload) => payload ) {
        return mapFunction(this.payload);
    }

    on(event: string | symbol, listener: (...args: any[]) => void) {
        //console.log('Listener registered');
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

    set mutation (mutationFunction : (store:PromiseStore<TPayload>, action:Action, mapFunction: (action:Action) => TPayload) => void) {
        this.mutationFunction = mutationFunction.bind(this);
    }

    private actionHandler(action:Action) {

        if (!this.filterFunction(action)) {
            //console.log('Not my job!', action.target, this.target)
            return false;
        }

        switch(action.state) {
            case ActionState.STARTED:
                this.state = StoreState.PENDING;
                //console.log('Store',StoreEvent.CHANGE, action);
                this.storeEventEmitter.emit(StoreEvent.CHANGE, action);
                return;

            case ActionState.FULFILLED:
                this.mutationFunction(this, action, this.mapFunction);
                this.state = StoreState.SUCCESS;
                //console.log('Store',StoreEvent.CHANGE, action);
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