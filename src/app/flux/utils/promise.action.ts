import { Target } from '../types/target';
import { Task } from '../types/task';
import appDispatcher, { AppDispatcher } from '../dispatcher';
import { ActionState } from '../types/action';


export default class PromiseAction {

    protected target: Target = Target.INIT;
    protected task: Task = Task.INIT;
    protected promise: Promise<any>;
    protected dispatcher: AppDispatcher = appDispatcher;

    constructor(target:Target, task:Task, promise:Promise<any>, dispatcher:AppDispatcher=appDispatcher) {
        this.target = target;
        this.task = task;
        this.promise = promise;
        this.dispatcher = dispatcher;
    }

    start() {

        this.promise
            .then(res=>this.onFulfilled(res))
            .catch(res=>this.onRejected(res));

        this.dispatcher.dispatch({
            target: this.target,
            task: this.task,
            state: ActionState.STARTED,
            payload: null,
            error: null
        });
    }

    protected onFulfilled(res:any) {
        this.dispatcher.dispatch({
            target: this.target,
            task: this.task,
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
            state: ActionState.REJECTED,
            payload: null,
            error: res
        });
    }

}