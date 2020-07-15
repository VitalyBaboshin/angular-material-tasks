import {Injectable} from '@angular/core';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
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

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.update(category);
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskDaoArray.delete(id);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDaoArray.delete(id);
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDaoArray.add(task);
  }

  addCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.add(category);
  }

  /** Поиск категории по названию */
  searchCategory(searchText: string): Observable<Category[]> {
    return this.categoryDaoArray.search(searchText);
  }

  // Статистика

  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getCompletedCountInCategory(category);
  }

  getUncompletedTotalCount(): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(null);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(category);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getTotalCountInCategory(category);
  }

}
