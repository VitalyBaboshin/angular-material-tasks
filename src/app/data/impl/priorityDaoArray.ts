import {PriorityDao} from '../interface/priorityDao';
import {Observable, of} from 'rxjs';
import {Priority} from '../../model/Priority';
import {TestData} from '../TestData';

export class PriorityDaoArray implements PriorityDao{
  add(T): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(T): Observable<Priority> {
    return undefined;
  }

}
