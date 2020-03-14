import { Task } from './task';
import { Target } from './target';

export enum ActionState {
    INIT,
    STARTED,
    FULFILLED,
    REJECTED
}


export interface Action {
    target: Target,
    task: Task,
    state: ActionState,
    payload: any,
    error: any
}

