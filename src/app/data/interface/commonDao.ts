import {Observable} from 'rxjs';

// стандартные методы CRUD (create read update delete)
// все методы возвращают Observable - для асинхронности и работы в реактивном стиле
export interface CommonDao<T> {

  /** получить все значения */
  getAll(): Observable<T[]>;

  /** получить одно значение по id */
  get(id: number): Observable<T>; // получение значения по уникальному id

  /** обновить значения */
  update(T): Observable<T>;

  /** удалить значения */
  delete(id: number): Observable<T>; // удаление по id

  /** добавить значения */
  add(T): Observable<T>;

}
