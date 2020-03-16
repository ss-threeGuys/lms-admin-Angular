import { Injectable } from '@angular/core';
import Publisher from '../model/publisher';
import PromiseAction from 'src/app/flux/utils/promise.action';
import { Target } from 'src/app/flux/types/target';
import { Task } from 'src/app/flux/types/task';
import axios from 'axios';

const crudUrls = {
    create:     'http://localhost:3000/admin/publishers',
    retrieve:   'http://localhost:3000/admin/publishers',
    update:     'http://localhost:3000/admin/publishers/:id',
    delete:     'http://localhost:3000/admin/publishers/:id',
};


@Injectable({
  providedIn: 'root'
})
export class PublisherService {

    constructor() { }

    private autoId = 1;


    create (publisher: Publisher) {

        const promise = axios({
            method: 'post',
            url: crudUrls.create,
            data: publisher
          })
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

        const promise = axios({
            method: 'put',
            url: crudUrls.update.replace(':id', publisher._id),
            data: publisher
          })
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

        const promise = axios({
            method: 'delete',
            url: crudUrls.update.replace(':id', publisher._id),
            data: publisher
          })
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
