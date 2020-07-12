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
    const taskTmp = TestData.tasks.find( t => t.id === id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);
    return of(taskTmp);
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

  /** Поиск задачи по параметрам, если одно из значений null то не будем учитывать его при поиске */
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTodos(category, searchText, status, priority));
  }

  private searchTodos(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {
    let allTasks = TestData.tasks;

    if ( category != null) {
      allTasks = allTasks.filter(todo => todo.category === category);
    }

    return allTasks;
  }
  update(task: Task): Observable<Task> {
    const taskTmp = TestData.tasks.find( t => t.id === task.id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);
    return of(task);
  }
}
