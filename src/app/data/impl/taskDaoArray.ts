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

  add(task: Task): Observable<Task> {
    if (task.id === null || task.id === 0) {
      task.id = this.getLastIdTask();
    }
    TestData.tasks.push(task);
    return of(task);
  }

  private getLastIdTask(): number {
    return Math.max.apply(Math, TestData.tasks.map(task => task.id)) + 1;
  }

  delete(id: number): Observable<Task> {
    const taskTmp = TestData.tasks.find( t => t.id === id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1);
    return of(taskTmp);
  }

  /** количество завершенных задач в заданной категории ( если category === null, то для все категорий) */
  getCompletedCountInCategory(category: Category): Observable<number> {
    return of(this.searchTasks(category, null, true, null).length);
  }
  /** кол-во всех задач в общем */
  getTotalCount(): Observable<number> {
    return of(TestData.tasks.length);
  }
  /** количество всех задач в заданной категории ( если category === null, то для все категорий) */
  getTotalCountInCategory(category: Category): Observable<number> {
    return of(this.searchTasks(category, null, null, null).length);
  }

  /** количество незавершенных задач в заданной категории ( если category === null, то для все категорий) */
  getUncompletedCountInCategory(category: Category): Observable<number> {
    return of(this.searchTasks(category, null, false, null).length);
  }

  /** Поиск задачи по параметрам, если одно из значений null то не будем учитывать его при поиске */
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  private searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {
    let allTasks = TestData.tasks;

    if ( status != null) {
      allTasks = allTasks.filter(task => task.completed === status);
    }
    if ( category != null) {
      allTasks = allTasks.filter(task => task.category === category);
    }
    if ( priority != null) {
      allTasks = allTasks.filter(task => task.priority === priority);
    }
    if ( searchText != null) {
      allTasks = allTasks.filter(task => task.title.toUpperCase().includes(searchText.toUpperCase()));
    }
    return allTasks;
  }

  update(task: Task): Observable<Task> {
    const taskTmp = TestData.tasks.find( t => t.id === task.id);
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task);
    return of(task);
  }

}
