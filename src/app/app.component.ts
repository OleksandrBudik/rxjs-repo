import { Component, OnInit } from '@angular/core';
import Api from './services/api.service';
import { random } from 'lodash';

import { Observable } from 'rxjs';
import { from, fromEvent } from 'rxjs';

import { map, mergeMap, concatMap, concatAll, catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rxjs-app';
  fullQuery = { query: '', country: 'Canada' };

  constructor(private api: Api) {

  }

  ngOnInit() {
    const input = document.getElementById('query-rxjs');
    const select = document.getElementById('country-rxjs');
    const inputKeyStrokes = fromEvent(input, 'keyup');
    const countrySelected = fromEvent(select, 'change');

    const querySubscription = inputKeyStrokes.subscribe((value) => { 
      console.log(' value ', value.srcElement['value']);
      this.fullQuery.query = value.srcElement['value'];
      this.qetData(this.fullQuery);
    });

    const countrySubscription = countrySelected.subscribe((value) => {
      console.log(' country-rxjs ', value.srcElement['value']);
      this.fullQuery.country = value.srcElement['value'];
      this.qetData(this.fullQuery);
    });

    //forkJoin([keyups, click], (...results) => console.log(' results ', ...results));

  }


  qetData(fullQuery) {
    console.log(' sending request with query ', fullQuery);
  }
  

 
}
