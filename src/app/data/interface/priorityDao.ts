import {CommonDao} from './commonDao';
import {Priority} from '../../model/Priority';

// специфичные методы для работы с приоритетами (которые не входят в обычный CRUD)
export interface PriorityDao extends CommonDao<Priority>{

}
