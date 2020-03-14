import { Dispatcher } from 'flux';
import { Action } from './types/action';

export class AppDispatcher extends Dispatcher<Action> {

}

const appDispatcher = new AppDispatcher();


export default appDispatcher;
