import {CommonDao} from './commonDao';
import {Task} from '../../model/Task';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';
import {Observable} from 'rxjs';

// специфичные методы для работы с задачами (которые не входят в обычный CRUD)
export interface TaskDao extends CommonDao<Task>{

  /** поиск задач по всем параметрам */
  // если какой-либо параметр равен null - он не будет учитываться при поиске
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

  /** Количество завершенных задач в заданной категории, если категория == null, то для всех категорий */
   getCompletedCountInCategory(category: Category): Observable<number>;

  /** Количество незавершенных задач в заданной категории, если категория == null, то для всех категорий */
  getUncompletedCountInCategory(category: Category): Observable<number>;

  /** Количество всех задач в заданной категории, (если категория == null, то для всех категорий) */
  getTotalCountInCategory(category: Category): Observable<number>;

  /** количество всех задач в общем */
  getTotalCount(): Observable<number>;
}
