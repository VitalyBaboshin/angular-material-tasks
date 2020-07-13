import {CategoryDao} from '../interface/categoryDao';
import {Observable, of} from 'rxjs';
import {Category} from '../../model/Category';
import {TestData} from '../TestData';

export class CategoryDaoArray implements CategoryDao{
  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  add(T): Observable<Category> {
    return undefined;
  }

  delete(id: number): Observable<Category> {
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null;
      }
    });
    const tmpCategory = TestData.categories.find(t => t.id === id);
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);
    return of(tmpCategory);
  }

  search(title: string): Observable<Category[]> {
    return undefined;
  }

  update(category: Category): Observable<Category> {
    const tmpCategory = TestData.categories.find(t => t.id === category.id);
    TestData.categories.splice(category.id - 1, 1, category);
    return of(tmpCategory);
  }
}
