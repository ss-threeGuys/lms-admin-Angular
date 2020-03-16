import { EventEmitter } from 'events';
import { ComponentEvent } from '../types/component';
import { SimpleChanges } from '@angular/core';

export default class FluxComponent {

    private _event: ComponentEvent = ComponentEvent.INIT;

    private _payload: any = null;

    private eventEmitter = new EventEmitter();

    constructor() {
        this.eventEmitter.on('ANY',this.eventListener.bind(this));
    }

    get event() {
        return this._event;
    }

    get payload() {
        return this._payload;
    }

    /**
   * Component lifecycle
   */

    ngOnInit() {
        this.emitEvent(ComponentEvent.INIT);
    }


    ngOnDestroy() {
        this.emitEvent(ComponentEvent.DESTROY);
    }

    emitEvent(event: ComponentEvent, payload: any = null) {
        this.eventEmitter.emit('ANY', {event:event, payload:payload});
    }

    protected eventListener(eventWithPayload: any) { 
        this.eventHandler(eventWithPayload.event, eventWithPayload.payload);
    }

    protected onEventInit(event: ComponentEvent, payload: any){
        this.emitEvent(ComponentEvent.IDLE);
    }

    protected onEventIdle(event: ComponentEvent, payload: any){
        // It idle, just wait for new event (from user input)
    }

    protected onEventPropChange(event: ComponentEvent, payload: any){
        
    }

    protected onEventDestroy(event: ComponentEvent, payload: any){
        // bye
    }

    protected onEventRetrieveRequest(event: ComponentEvent, payload: any){
        this.emitEvent(ComponentEvent.RETRIEVE_PENDING);
    }

    protected onEventRetrievePending(event: ComponentEvent, payload: any){
        this.emitEvent(ComponentEvent.RETRIEVE_DONE);
    }

    protected onEventRetrieveDone(event: ComponentEvent, payload: any){
        this.emitEvent(ComponentEvent.IDLE);
    }

    protected onEventCreateRequest(event: ComponentEvent, payload: any){
        this.emitEvent(ComponentEvent.CREATE_WAIT_INPUT);
    }

    protected onEventCreateWaitInput(event: ComponentEvent, payload: any){
        // Wait for user input
    }

    protected onEventCreateInput(event: ComponentEvent, payload: any){
        this.emitEvent(ComponentEvent.CREATE_PENDING);
    }

    protected onEventCreatePending(event: ComponentEvent, payload: any){
        this.emitEvent(ComponentEvent.CREATE_DONE);
    }

    protected onEventCreateDone(event: ComponentEvent, payload: any){
        this.emitEvent(ComponentEvent.IDLE);
    }

    protected onEventUpdateRequest(event: ComponentEvent, payload: any){
        this.emitEvent(ComponentEvent.UPDATE_WAIT_INPUT);
    }

    protected onEventUpdateWaitInput(event: ComponentEvent, payload: any){
         // Wait for user input
    }

    protected onEventUpdateInput(event: ComponentEvent, payload: any){
        this.emitEvent(ComponentEvent.UPDATE_PENDING);
    }

    protected onEventUpdatePending(event: ComponentEvent, payload: any){
        this.emitEvent(ComponentEvent.UPDATE_DONE);
    }

    protected onEventUpdateDone(event: ComponentEvent, payload: any){
        this.emitEvent(ComponentEvent.IDLE);
    }

    protected onEventDeleteRequest(event: ComponentEvent, payload: any){
        this.emitEvent(ComponentEvent.DELETE_PENDING);
    }

    protected onEventDeletePending(event: ComponentEvent, payload: any){
        this.emitEvent(ComponentEvent.DELETE_DONE);
    }

    protected onEventDeleteDone(event: ComponentEvent, payload: any){
        this.emitEvent(ComponentEvent.IDLE);
    }

    private eventHandler(event: ComponentEvent, payload: any) {
        //console.log(event, payload);

        this._event = event;
        this._payload = payload;
       

        switch(event) {

        case ComponentEvent.INIT: 
            this.onEventInit(event, payload);
            break;
        case ComponentEvent.IDLE: 
            this.onEventIdle(event, payload);
            break;

        case ComponentEvent.DESTROY: 
            this.onEventDestroy(event, payload);
            break;

        case ComponentEvent.RETRIEVE_REQUEST:
            this.onEventRetrieveRequest(event, payload);
            break;
        case ComponentEvent.RETRIEVE_PENDING:
            this.onEventRetrievePending(event, payload);
            break;
        case ComponentEvent.RETRIEVE_DONE:
            this.onEventRetrieveDone(event, payload);
            break;

        /**
         * CREATE lifecycle
         * REQUEST -> WAIT_INPUT -> INPUT -> PENDING -> DONE
         */
        case ComponentEvent.CREATE_REQUEST:
            this.onEventCreateRequest(event, payload);
            break;
        case ComponentEvent.CREATE_WAIT_INPUT:
            this.onEventCreateWaitInput(event, payload);
            break;
        case ComponentEvent.CREATE_INPUT:
            this.onEventCreateInput(event, payload);
            break;
        case ComponentEvent.CREATE_PENDING:
            this.onEventCreatePending(event, payload);
            break;
        case ComponentEvent.CREATE_DONE:
            this.onEventCreateDone(event, payload);
            break;

        /**
         * UPDATE lifecycle
         * REQUEST -> WAIT_INPUT -> INPUT -> PENDING -> DONE
         */
        case ComponentEvent.UPDATE_REQUEST:
            this.onEventUpdateRequest(event, payload);
            break;
        case ComponentEvent.UPDATE_WAIT_INPUT:
            this.onEventUpdateWaitInput(event, payload);
            break;
        case ComponentEvent.UPDATE_INPUT:
            this.onEventUpdateInput(event, payload);
            break;
        case ComponentEvent.UPDATE_PENDING:
            this.onEventUpdatePending(event, payload);
            break;
        case ComponentEvent.UPDATE_DONE:
            this.onEventUpdateDone(event, payload);
            break;

        case ComponentEvent.DELETE_REQUEST:
            this.onEventDeleteRequest(event, payload);
            break;
        case ComponentEvent.DELETE_PENDING:
            this.onEventRetrievePending(event, payload);
            break;
        case ComponentEvent.DELETE_DONE:
            this.onEventDeleteDone(event, payload);
            break;
            
        }

      
      }

}