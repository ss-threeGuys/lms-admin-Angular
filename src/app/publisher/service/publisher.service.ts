import { Injectable } from '@angular/core';
import Publisher from '../model/publisher';
import PromiseAction from 'src/app/flux/utils/promise.action';
import { Target } from 'src/app/flux/types/target';
import { Task } from 'src/app/flux/types/task';
import axios from 'axios';
import { environment } from 'src/environments/environment';

const crudUrls = {
    create:     'http://'+environment.crudUrls.baseHost+':'
                    + environment.crudUrls.basePort
                    + environment.crudUrls.prefix 
                    + environment.crudUrls.publisher.create.url,
    retrieve:   'http://'+environment.crudUrls.baseHost+':'
                    + environment.crudUrls.basePort
                    + environment.crudUrls.prefix 
                    + environment.crudUrls.publisher.retrieve.url,
    update:     'http://'+environment.crudUrls.baseHost+':'
                    + environment.crudUrls.basePort
                    + environment.crudUrls.prefix 
                    + environment.crudUrls.publisher.update.url,
    delete:     'http://'+environment.crudUrls.baseHost+':'
                    + environment.crudUrls.basePort
                    + environment.crudUrls.prefix 
                    + environment.crudUrls.publisher.delete.url,
};


const params = {
    create: environment.crudUrls.publisher.create.param,
    retrieve: environment.crudUrls.publisher.retrieve.param,
    update: environment.crudUrls.publisher.update.param,
    delete: environment.crudUrls.publisher.delete.param,
}



@Injectable({
  providedIn: 'root'
})
export class PublisherService {

    constructor() { }

    private autoId = 1;


    create (publisher: Publisher) {

        const promise = axios({
            method: 'POST',
            url: crudUrls.create,
            data: publisher
          })
        .then(
            (response) => {
                //console.log(response.data);
                return new Promise(
                    (resolve,reject) =>{
                        if (Array.isArray(response.data))
                            resolve([...response.data]);
                        else
                            resolve([response.data]);
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

    retrieve(sortField:string, sortOrder:number, currentPage:number, pageSize:number) {

        const promise = axios({
            method: 'GET',
            url: crudUrls.retrieve+'/paging',
            params: {
                sortField: sortField,
                sortOrder: sortOrder,
                currentPage: currentPage,
                pageSize: pageSize
            }
          })
            .then(
                (response) => {
                    return new Promise(
                        (resolve,reject) =>{
                            let paging = response.data.pop();
                            
                            if (Array.isArray(response.data)){
                                resolve([...response.data, paging]);
                            }
                            else {
                                resolve([response.data, paging]);
                            }
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

        let url = crudUrls.update;

        for(let param of Object.keys(params.update)) {
            // :id -> publisher['_id']
            url = url.replace(':'+param, publisher[params.update[param]]);
        }
        const promise = axios({
            method: 'PUT',
            url: url,
            data: publisher
          })
        .then(
            (response) => {
                //console.log(response.data);
                return new Promise(
                    (resolve,reject) =>{
                        if (Array.isArray(response.data))
                            resolve([...response.data]);
                        else
                            resolve([response.data]);
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
        let url = crudUrls.delete;

        for(let param of Object.keys(params.delete)) {
            // :id -> publisher['_id']
            url = url.replace(':'+param, publisher[params.delete[param]]);
        }
    
        const promise = axios({
            method: 'DELETE',
            url: url,
            data: publisher
          })
        .then(
            (response) => {
                //console.log(response.data);
                return new Promise(
                    (resolve,reject) =>{
                        if (Array.isArray(response.data))
                            resolve([...response.data]);
                        else
                            resolve([response.data]);
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
