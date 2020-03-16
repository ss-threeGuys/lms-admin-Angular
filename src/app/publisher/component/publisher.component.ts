import { Component, OnInit } from '@angular/core';
import cols from '../model/publisher.cols';
import Publisher from '../model/publisher';

import publisherStore from '../model/publisher.store';

import PublisherClass from '../model/publisher.class';
import { PublisherService } from '../service/publisher.service';

import { ComponentEvent } from 'src/app/flux/types/component';

import PrimeComponent from './primecomponent';


@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css'],
  providers: [ PublisherService ]
})
export class PublisherComponent extends PrimeComponent<Publisher> implements OnInit {
  
  // Made this class reusable!
  //
  // All view-model moved to super class (PrimeComponent) and will be managed from their
  // Using FLUX pattern: 
  //    component will listen to FLUX store and update PrimeComponent.pPayload if needed.
  //    see (this.storeListener)

  constructor(private service: PublisherService) { 
    super('Publisher', cols, service, publisherStore); 
  }
  
  primeInit() {

  }

  newObject() {
    return new PublisherClass();
  }


}
