import FluxComponent from "../../flux/utils/flux.component";
import { ComponentEvent } from 'src/app/flux/types/component';
import CrudService from '../service/crudservice.interface';
import PromiseStore from 'src/app/flux/utils/promise.store';
import { Action, ActionState } from 'src/app/flux/types/action';
import { Task } from 'src/app/flux/types/task';
import { StoreEvent } from 'src/app/flux/types/store';
import { ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';

export default abstract class PrimeComponent<TPayload> extends FluxComponent {
    
    @ViewChild('dt') private tableElement: any;

    private _componentName: string = 'Prime';

    private _pDialogShow:boolean = false;

    private _inputPayload: TPayload;

    private _pColumnMap: any[] = [];

    private _pPayload: TPayload[] = [];

    private _addButtonLabel: string = 'Add';

    private _deleteButtonLabel: string = 'Delete';

    private _saveButtonLabel: string = 'Save';

    private _pAddEnabled: boolean = true;

    private _pDeleteEnabled: boolean = false;

    private _pSaveEnabled: boolean = false;

    private _pAddButtonShow: boolean = true;

    private _pDeleteButtonShow: boolean = false;

    private _pSaveButtonShow: boolean = false;

    private _pValidInput: boolean = false;

    private _sortField: string = "";

    private _sortOrder: number = 0;

    private _currentPage: number = 1;

    private _pageSize: number = 10;

    private _count: number;

    private _formControl: any = {};

    private _loading:boolean = false;

    private readonly _service: CrudService<TPayload>;

    private readonly _store: PromiseStore<TPayload>;

    private readonly _storeMapFunction: (payload: any) => any;

    

    get sortField() {
        return this._sortField;
    }

    get sortOrder() {
        return this._sortOrder;
    }

    get currentPage() {
        return this._currentPage;
    }

    set currentPage(currentPage:number) {
        this.currentPage = currentPage;
    }

    get pageSize() {
        return this._pageSize;
    }

    set pageSize(pageSize: number) {
        this._pageSize = pageSize;
    }

    get count() {
        return this._count;
    }

    set count(count: number) {
        this._count = count;
    }

    constructor(
        name: string,
        colsMap: any[],
        service: CrudService<TPayload>, 
        store: PromiseStore<TPayload>,
        storeMapFunction: (payload: any) => any = 
            (payload) => {
                if ((payload === null)||(payload === undefined))
                return [];
                else
                return payload;
            }
        ) {
        super();
        this._componentName = name;
        this._pColumnMap = colsMap;
        this._service = service;
        this._store = store;
        this._sortField = colsMap[0].field;
        this._sortOrder = 1;
        this._storeMapFunction = storeMapFunction;


        for (let col of colsMap) {
            const defaultValue = col.defaultValue?col.default:null;
            this._formControl[col.field] = new FormControl(defaultValue, col.validator);
        }
    }

    protected abstract primeInit() : void; 

    protected abstract newObject() : TPayload;

    // ngOnIntt() equivallent
    protected onEventInit() {
        this._store.on(StoreEvent.CHANGE, this.storeListener.bind(this));
        //this.emitEvent(ComponentEvent.RETRIEVE_REQUEST);
        this.primeInit();
    }

    protected ngAfterViewInit() {
        this.tableElement.onSort.subscribe(data => {
            //console.log(data);
            this._sortField = data.field;
            this._sortOrder = data.order;
        });
    }

    protected onInputChange() {
        //console.log('Input Changed');
        this._pValidInput = true;
        for (let key of Object.keys(this._formControl)) {
            this._inputPayload[key] = this._formControl[key].value;
            if (this._formControl[key].status !== 'VALID') {
                this._pValidInput = false;
            
            }
                
        } 
    }

    private updateFormControlValue() {
        for (let key of Object.keys(this._formControl)) {
             this._formControl[key].setValue(this._inputPayload[key]);
        }
        this.onInputChange();
    }

    // ngOnDestroy() equivallent
    protected onEventDestroy() {
        this._store.removeListener(StoreEvent.CHANGE, this.storeListener.bind(this));
    }
    /*
     * User Input Event 
     */

    protected onAddButtonClick() {
        this.emitEvent(ComponentEvent.CREATE_REQUEST);
    }

    protected onSaveButtonClick() {
        
        if (this.event === ComponentEvent.CREATE_WAIT_INPUT) 
            this.emitEvent(ComponentEvent.CREATE_INPUT, this._inputPayload);
        else if (this.event === ComponentEvent.UPDATE_WAIT_INPUT) 
            this.emitEvent(ComponentEvent.UPDATE_INPUT, this._inputPayload);
        else
            console.log("Invalid State Change", this.event)
    }

    protected onDeleteButtonClick() {
        this.emitEvent(ComponentEvent.DELETE_REQUEST, this._inputPayload);
    }

    protected onRowSelect(event:any) {
        this._inputPayload = {...event.data};
        this.emitEvent(ComponentEvent.UPDATE_REQUEST, this._inputPayload);
    }

    protected onLoadData(event: LazyLoadEvent) {

        console.log(event);
        this._currentPage = 1+(event.first/this._pageSize);
        this._loading = true;

        this.emitEvent(ComponentEvent.RETRIEVE_REQUEST);
    }  

    /*
    * 
    */

    protected onEventRetrieveRequest() {
        this.serviceRetrieve(this._sortField, this._sortOrder, this._currentPage, this._pageSize);
    }

    protected onEventRetrieveDone(event: ComponentEvent, payload: any) {
        let paging = payload?payload.pop().__paging:{};
        this.pPayload = payload;
        this._count = paging.count;
        this._loading = false;
        this.emitEvent(ComponentEvent.IDLE);
    }


    protected onEventCreateRequest() {
        this.inputPayload = this.newObject();
        this.updateFormControlValue() 
        this._pDeleteEnabled = false;
        this._pDeleteButtonShow = false;
        this._pSaveButtonShow = true;
        this._pSaveEnabled = true;
        this._saveButtonLabel = 'Create';
        this.pDialogShow = true;
        this._pValidInput = false;
        this.emitEvent(ComponentEvent.CREATE_WAIT_INPUT);
    }

    protected onEventCreateInput(event: ComponentEvent, payload: any) {
        this.pDialogShow = false;
        this.serviceCreate(payload);
    }

    protected onEventCreateDone(event: ComponentEvent, payload: any) {

        this.pPayload = payload;
        this.emitEvent(ComponentEvent.IDLE);
    }


    protected onEventUpdateRequest(event: ComponentEvent, payload: any) {
        this.inputPayload = payload;
        this.updateFormControlValue() 
        this._pDeleteEnabled = true;
        this._pSaveEnabled = true;
        this._pDeleteButtonShow = true;
        this._pSaveButtonShow = true;
        this._saveButtonLabel = 'Update';
        this.pDialogShow = true;
        this._pValidInput = false;
        this.emitEvent(ComponentEvent.UPDATE_WAIT_INPUT);
    }

    protected onEventUpdateInput(event: ComponentEvent, payload: any) {
        this.pDialogShow = false;
        this.serviceUpdate(payload);
    }

    protected onEventUpdateDone(event: ComponentEvent, payload: any) {
        this._pAddEnabled = true;
        this.pPayload= payload;
        this.emitEvent(ComponentEvent.IDLE);
    }


    protected onEventDeleteRequest(event: ComponentEvent, payload: any)  { 
        this.pDialogShow = false;
        this.serviceDelete(payload);
    }

    protected onEventDeleteDone(event: ComponentEvent, payload: any) {
        this._pAddEnabled = true;
        this.pPayload= payload;
        this.emitEvent(ComponentEvent.IDLE);
    }

    /*
     * Getter and Setter
     */

    get componentName() {
        return this._componentName;
    } 

    set componentName(componentName:string) {
        this._componentName = componentName;
    }

    get pDialogShow() {
        return this._pDialogShow;
    }

    set pDialogShow(show:boolean) {
        this._pDialogShow = show;
    }

    get pPayload() {
        // Clone it! 
        return [...this._pPayload];
    }

    set pPayload(pPayload: TPayload[]) {
        this._pPayload = pPayload;
    }

    get pColumnMap() {
        return this._pColumnMap;
    }

    get inputPayload() {
        return this._inputPayload;
    }

    set inputPayload(inputPayload: TPayload) {
        this._inputPayload = inputPayload;
    }

    protected serviceRetrieve(sortField: string, sortOrder: number, currentPage:number, pageSize: number) {
        this._service.retrieve(sortField, sortOrder, currentPage, pageSize);
    }

    protected serviceCreate(payload: any) {
    this._service.create(payload);
    }

    protected serviceUpdate(payload: any) {
    this._service.update(payload);
    }

    protected serviceDelete(payload: any) {
    this._service.delete(payload);
    }

    protected storeListener(action: Action) {
        //console.log(action);
        let payload = [...this._store.get(this._storeMapFunction)];

        if (action.state === ActionState.FULFILLED)
        switch(action.task) {
          case Task.RETRIEVE:
            this.emitEvent(ComponentEvent.RETRIEVE_DONE, payload);
            break;
          case Task.CREATE:
            this.emitEvent(ComponentEvent.CREATE_DONE, payload);
            break;
          case Task.UPDATE:
            this.emitEvent(ComponentEvent.UPDATE_DONE, payload);
            break;
          case Task.DELETE:
            this.emitEvent(ComponentEvent.DELETE_DONE, payload);
            break;
        }

        if (action.state === ActionState.STARTED)
        switch(action.task) {
          case Task.RETRIEVE:
            this.emitEvent(ComponentEvent.RETRIEVE_PENDING, payload);
            break;
          case Task.CREATE:
            this.emitEvent(ComponentEvent.CREATE_PENDING, payload);
            break;
          case Task.UPDATE:
            this.emitEvent(ComponentEvent.UPDATE_PENDING, payload);
            break;
          case Task.DELETE:
            this.emitEvent(ComponentEvent.DELETE_PENDING, payload);
            break;
        }
    
      }
  
}