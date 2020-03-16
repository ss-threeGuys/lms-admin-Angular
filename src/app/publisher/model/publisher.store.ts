import PromiseStore from "src/app/flux/utils/promise.store";
import Publisher from './publisher';
import { Target } from 'src/app/flux/types/target';
import { Task } from 'src/app/flux/types/task';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class PublisherStore extends PromiseStore<Publisher> {

    constructor() {
        super(Target.PUBLISHER);

        this.mutation = (store, action, mapFunction) => {
            try {
                if (action.task === Task.RETRIEVE) {
                    store.payload = mapFunction(action);
                } else if (action.task === Task.CREATE) {
                    //console.log(action, mapFunction(action));
                    store.payload = store.payload.concat(mapFunction(action));
                } else if (action.task === Task.UPDATE) {
                    let updatedElement = mapFunction(action).shift();
                    store.payload = store.payload.filter(  (v,i) => v._id != updatedElement._id).concat(updatedElement);
                } else if (action.task === Task.DELETE) {
                    let deletedElement = mapFunction(action).shift();
                    store.payload = store.payload.filter(  (v,i) => v._id != deletedElement._id);
                }
            } catch(e) {
                console.log(action, e);
            }
        };
    }


}

const publisherStore = new PublisherStore();

export default publisherStore;