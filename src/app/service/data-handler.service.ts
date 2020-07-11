import {Injectable} from '@angular/core';
import {Category} from '../model/Category';
import {Task} from '../model/Task';
import {TestData} from '../data/TestData';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  // taskSubject = new Subject<Task[]>();
  taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);
  constructor() { }


  fillTasks(): void {
    this.taskSubject.next(TestData.tasks);
  }
  fillTaskByCategory(category: Category): void {
    const tasks = TestData.tasks.filter(task => task.category === category );
    this.taskSubject.next(tasks);
  }
}
