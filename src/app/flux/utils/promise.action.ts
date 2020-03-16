import { Target } from '../types/target';
import { Task } from '../types/task';
import appDispatcher, { AppDispatcher } from '../appdispatcher';
import { ActionState } from '../types/action';


export default class PromiseAction {

    protected target: Target = Target.INIT;
    protected task: Task = Task.INIT;
    protected promise: Promise<any>;
    protected requestPayload: any = null;
    protected dispatcher: AppDispatcher = appDispatcher;

    constructor(target:Target, task:Task, promise:Promise<any>, requestPayload:any = null, dispatcher:AppDispatcher=appDispatcher) {
        this.target = target;
        this.task = task;
        this.promise = promise;
        this.requestPayload = requestPayload;
        this.dispatcher = dispatcher;
    }

    start() {

        this.promise
            .then(res=>this.onFulfilled(res))
            .catch(res=>this.onRejected(res));
        //console.log(ActionState.STARTED, this.target, this.task);
        this.dispatcher.dispatch({
            target: this.target,
            task: this.task,
            requestPayload: this.requestPayload,
            state: ActionState.STARTED,
            payload: null,
            error: null
        });
    }

    protected onFulfilled(res:any) {
        //console.log(ActionState.FULFILLED, this.target, this.task, res);
        this.dispatcher.dispatch({
            target: this.target,
            task: this.task,
            requestPayload: this.requestPayload,
            state: ActionState.FULFILLED,
            payload: res,
            error: null
        });
    }

    protected onRejected(res:any) {
        
        console.log(ActionState.REJECTED, this.target, this.task, res);

        this.dispatcher.dispatch({
            target: this.target,
            task: this.task,
            requestPayload: this.requestPayload,
            state: ActionState.REJECTED,
            payload: null,
            error: res
        });
    }

}