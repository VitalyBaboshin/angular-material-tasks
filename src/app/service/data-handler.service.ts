import {Injectable} from '@angular/core';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {TestData} from '../data/TestData';
import {Observable} from 'rxjs';
import {TaskDaoArray} from '../data/impl/taskDaoArray';
import {CategoryDaoArray} from '../data/impl/categoryDaoArray';
import {Priority} from '../model/Priority';
import {PriorityDaoArray} from '../data/impl/priorityDaoArray';


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  private taskDaoArray = new TaskDaoArray();
  private categoryDaoArray = new CategoryDaoArray();
  private priorityDaoArray = new PriorityDaoArray();

  constructor() { }

  getAllTasks(): Observable<Task[]> {
      return this.taskDaoArray.getAll();
  }
  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll();
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDaoArray.getAll();
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskDaoArray.delete(id);
  }
  toogleTaskCompleted(task): void {
    const index = TestData.tasks.indexOf(task);
    TestData.tasks[index].completed = !TestData.tasks[index].completed;
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }
}
