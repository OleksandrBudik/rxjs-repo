import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, mergeMap, concatMap, concatAll, catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class ApiService {

  constructor(private http: HttpClient) { 

  }

  //for running sequentially
  getSequentially(ids: number[]): Observable<any> {
    return from(ids).pipe(
      concatMap(id => {
        return <Observable<any>> this.http.get('https://swapi.co/api/people/' + id)
          .pipe(
            map(res => { console.log(`http success :: id ${id}`); return res }),
            catchError(err => { console.log(`http error :: id ${id}`); return of(err) }));
      })
    );
    
  }

  //for running in parallel
  getInParallel(ids: number[]): Observable<any> {
    return <Observable<any>> forkJoin(
      ids.map(id => {
        return this.http.get('https://swapi.co/api/people/' + id)
                  .pipe(
                    map(res => { console.log(`http success :: id ${id}`); return res }), 
                    catchError(err => { console.log(`http error :: id ${id}`); return of(err) }));
      }))
      .pipe(
        concatAll(), 
        catchError(error => { console.log(' http error ', error); return of(error); }));
  }

}
