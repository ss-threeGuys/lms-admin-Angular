import { Task } from './task';
import { Target } from './target';

export enum ActionState {
    INIT = 'INIT',
    STARTED = 'STARTED',
    FULFILLED = 'FULFILLED',
    REJECTED = 'REJECTED'
}


export interface Action {
    target: Target,
    task: Task,
    requestPayload: any,
    state: ActionState,
    payload: any,
    error: any
}

export default function (
    target: Target,
    task: Task,
    requestPayload: any,
    state: ActionState = ActionState.INIT,
    payload: any = null,
    error: any = null) {

        return {target:target, task:task, requestPayload:requestPayload, state:state, payload:payload, error:error};
    };

