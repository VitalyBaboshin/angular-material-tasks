import {PriorityDao} from '../interface/priorityDao';
import {Observable, of} from 'rxjs';
import {Priority} from '../../model/Priority';
import {TestData} from '../TestData';

export class PriorityDaoArray implements PriorityDao{

  add(priority: Priority): Observable<Priority> {
    if (priority.id === null || priority.id === 0) {
      priority.id = this.getLastIdPriority();
    }
    TestData.priorities.push(priority);
    return of(priority);
  }

  private getLastIdPriority(): number {
    return Math.max.apply(Math, TestData.priorities.map(priority => priority.id)) + 1;
  }

  delete(id: number): Observable<Priority> {
    TestData.tasks.forEach(task => {
      if (task.priority && task.priority.id === id) {
        task.priority = null;
      }
    });
    const tmpPriority = TestData.priorities.find(t => t.id === id);
    TestData.priorities.splice(TestData.priorities.indexOf(tmpPriority), 1);
    return of(tmpPriority);
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(priority: Priority): Observable<Priority> {
    const priorityTmp = TestData.priorities.find( p => p.id === priority.id);
    TestData.priorities.splice(TestData.priorities.indexOf(priorityTmp), 1, priority);
    return of(priority);
  }
}
