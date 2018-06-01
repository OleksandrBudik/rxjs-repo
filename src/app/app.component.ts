import { Component, OnInit } from '@angular/core';
import Api from './services/api.service';
import { random } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rxjs-app';
  constructor(private api: Api) {

  }
  ngOnInit() {
    //this.api.getSequentially(this.randomArrayOfPersonIds()).subscribe((data: any) => {
    this.api.getInParallel(this.randomArrayOfPersonIds()).subscribe((data: any) => {
      console.log(data);
    },
    (error: any) => {
      console.log(' some err ', error.message);
    },
    () => {
      console.log(' completed ');
    }    
  );
  }

  randomArrayOfPersonIds() {
    const length = random(1, 10);
    const array = [];

    for (let i = 0; i < length; i++ ) {
      array.push(random(1, 20));
    }

    return array.sort();

  }
}
