import { Component, OnInit } from '@angular/core';
import cols from '../model/publisher.cols';
import Publisher from '../model/publisher';
import { Action } from 'src/app/flux/types/action';
import publisherStore from '../model/publisher.store';
import { StoreEvent } from 'src/app/flux/types/store';
import PublisherClass from '../model/publisher.class';
import { PublisherService } from '../service/publisher.service';



@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css'],
  providers: [ PublisherService ]
})



export class PublisherComponent implements OnInit {

  private componentColumnMap: any[] = cols;

  private componentState: Publisher[] = [];

  private componentName: String = 'Publisher';

  private mutable: Publisher;

  private modalDialogShow:boolean = false;
  
  constructor(private publisherService: PublisherService) { }

  ngOnInit() {
    publisherStore.on(StoreEvent.CHANGE, this.storeListener.bind(this));
    this.publisherService.retrieve();
  }

  onAdd() {
    this.mutable = new PublisherClass();
    this.modalDialogShow = true;
  }

  onSave() {
    
    this.modalDialogShow = false;

    if (this.mutable._id === undefined)
      this.publisherService.create(this.mutable);
    else
      this.publisherService.update(this.mutable);

    this.mutable = null;

  }

  onDelete() { 
    
    this.modalDialogShow = false;

    this.publisherService.delete(this.mutable);

    this.mutable = null;
  
  }

  onRowSelect(event:any) {

    this.mutable = PublisherClass.clone(event.data);
    this.modalDialogShow = true;
  }

  storeListener(action: Action) {

      this.componentState = [...publisherStore.get(
        payload => {
          if ((payload === null)||(payload === undefined))
            return [];
          else
            return payload;
      })];

  }


}
