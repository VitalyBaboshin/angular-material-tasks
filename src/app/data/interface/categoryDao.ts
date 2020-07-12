import {CommonDao} from './commonDao';
import {Category} from '../../model/Category';
import {Observable} from 'rxjs';

// специфичные методы для работы с категориями (которые не входят в обычный CRUD)
export interface CategoryDao extends CommonDao<Category> {

  /** поиск категории по названию */
  search(title: string): Observable<Category[]>;
}
