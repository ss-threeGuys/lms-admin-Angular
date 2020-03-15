import { Injectable } from '@angular/core';
import Publisher from '../model/publisher';
import PromiseAction from 'src/app/flux/utils/promise.action';
import { Target } from 'src/app/flux/types/target';
import { Task } from 'src/app/flux/types/task';
import axios from 'axios';

const crudUrls = {
    create:     'http://www.mocky.io/v2/5e6ce6272e000065000eea8d',
    retrieve:   'http://www.mocky.io/v2/5e6ce4062e000057000eea8a',
    update:     'http://www.mocky.io/v2/5e6ce76f2e000059000eea90',
    delete:     'http://www.mocky.io/v2/5e6ce8d82e000059000eea99',
};


@Injectable({
  providedIn: 'root'
})
export class PublisherService {

    constructor() { }

    private autoId = 1;


    create (publisher: Publisher) {

        const promise = axios.get(crudUrls.create)
        .then(
            (response) => {
                console.log(response.data);
                return new Promise(
                    (resolve,reject) =>{
                        resolve(response.data);
                });
        })
        .catch(
            (response) => {
                return new Promise(
                    (resolve,reject) =>{
                        reject(response);
                });
        });

        const promiseAction = new PromiseAction(Target.PUBLISHER, Task.CREATE, promise, publisher);

        promiseAction.start();

    }

    retrieve() {

        const promise = axios.get(crudUrls.retrieve)
            .then(
                (response) => {
                    console.log(response.data);
                    return new Promise(
                        (resolve,reject) =>{
                            resolve(response.data);
                    });
            })
            .catch(
                (response) => {
                    return new Promise(
                        (resolve,reject) =>{
                            reject(response);
                    });
            });

        const promiseAction = new PromiseAction(Target.PUBLISHER, Task.RETRIEVE, promise);

        promiseAction.start();

    }

    update (publisher: Publisher) {

        const promise = axios.get(crudUrls.update)
        .then(
            (response) => {
                console.log(response.data);
                return new Promise(
                    (resolve,reject) =>{
                        resolve(response.data);
                });
        })
        .catch(
            (response) => {
                return new Promise(
                    (resolve,reject) =>{
                        reject(response);
                });
        });


        const promiseAction = new PromiseAction(Target.PUBLISHER, Task.UPDATE, promise, publisher);

        promiseAction.start();


    }

    delete (publisher: Publisher) {

        const promise = axios.get(crudUrls.delete)
        .then(
            (response) => {
                console.log(response.data);
                return new Promise(
                    (resolve,reject) =>{
                        resolve(response.data);
                });
        })
        .catch(
            (response) => {
                return new Promise(
                    (resolve,reject) =>{
                        reject(response);
                });
        });


        const promiseAction = new PromiseAction(Target.PUBLISHER, Task.DELETE, promise, publisher);

        promiseAction.start();


    }
}
