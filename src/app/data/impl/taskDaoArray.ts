import {TaskDao} from '../interface/taskDao';
import {Observable, of} from 'rxjs';
import {Category} from '../../model/Category';
import {Task} from '../../model/Task';
import {Priority} from '../../model/Priority';
import {TestData} from '../TestData';

export class TaskDaoArray implements TaskDao {

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks.find(todo => todo.id === id));
  }

  add(T): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    return undefined;
  }


  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return undefined;
  }

  update(T): Observable<Task> {
    return undefined;
  }
}
