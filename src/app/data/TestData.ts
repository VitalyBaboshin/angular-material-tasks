import {Category} from '../model/Category';
import {Priority} from '../model/Priority';
import {Task} from '../model/Task';

export class TestData {
  static categories: Category[] = [
    {id: 1, title: 'Работа'},
    {id: 2, title: 'Семья'},
    {id: 3, title: 'Учеба'},
    {id: 4, title: 'Отдых'},
    {id: 5, title: 'Спорт'},
    {id: 6, title: 'Еда'},
    {id: 7, title: 'Финансы'},
    {id: 8, title: 'Гаджеты'},
    {id: 9, title: 'Здоровье'},
    {id: 10, title: 'Автомобиль'}
  ];

  static priorities: Priority[] = [
    {id: 1, title: 'Низкий', color: '#e5e5e5'},
    {id: 2, title: 'Срединй', color: '#85d1b2'},
    {id: 3, title: 'Высокий', color: '#f1828d'},
    {id: 4, title: 'Очень срочно!', color: '#f11280'},
  ];

  static tasks: Task[] = [
    {
      id: 1,
      title: 'Залить бензин полный бак',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[9],
      date: new Date('2020-07-10')
    },
    {
      id: 2,
      title: 'Передать отчеты начальнику',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[0],
      date: new Date('2020-07-11')
    },
    {
      id: 3,
      title: 'Помыть полы в комнате',
      priority: TestData.priorities[2],
      completed: true,
      category: TestData.categories[1],
      date: new Date('2020-07-12')
    },
    {
      id: 3,
      title: 'Помыть полы в комнате',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[1],
      date: new Date('2020-07-12')
    },
    {
      id: 4,
      title: 'Пригласить друзей',
      priority: TestData.priorities[1],
      completed: false,
      category: TestData.categories[1],
      date: new Date('2020-06-12')
    },
    {
      id: 5,
      title: 'Изучить Паттерны',
      completed: false,
      category: TestData.categories[1],

    },
    {
      id: 6,
      title: 'Сходить на семинар по NodeJS',
      priority: TestData.priorities[1],
      completed: true,
      category: TestData.categories[2],
      date: new Date('2020-06-27')
    },
    {
      id: 7,
      title: 'Запланировать отдых',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[3]
    },
    {
      id: 8,
      title: 'Приготовить обед',
      completed: false,
      category: TestData.categories[5]
    },
    {
      id: 9,
      title: 'Подянуться 15 раз',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[4],
      date: new Date('2020-07-30')
    },
    {
      id: 10,
      title: 'Бег на 10 км',
      priority: TestData.priorities[0],
      completed: true,
      category: TestData.categories[4],
      date: new Date('2020-07-06')
    },
    {
      id: 11,
      title: 'Погулять на улице',
      completed: false
    },
    {
      id: 12,
      title: 'Сходить на лекцию по Deno',
      priority: TestData.priorities[1],
      completed: false,
      category: TestData.categories[2],
      date: new Date('2020-07-12')
    },
    {
      id: 13,
      title: 'Сходить в магазин за продуктами',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[5],
      date: new Date('2020-07-21')
    },
    {
      id: 14,
      title: 'Осмыслить все проекты',
      completed: true,
      category: TestData.categories[0],
    },
    {
      id: 15,
      title: 'Сдать экзамены по JS',
      priority: TestData.priorities[2],
      completed: true,
    },
    {
      id: 16,
      title: 'Положить 150 000 руб в банк на депозит',
      priority: TestData.priorities[3],
      completed: false,
      category: TestData.categories[6],
      date: new Date('2020-07-19')
    },
    {
      id: 17,
      title: 'Попросить яблоко у сотрудника',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[6]
    },
    {
      id: 18,
      title: 'Сдать анализы на ковид',
      priority: TestData.priorities[3],
      completed: false,
      category: TestData.categories[8],
      date: new Date('2020-07-15')
    },
    {
      id: 19,
      title: 'Сравнить honor с iphone',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[7],
      date: new Date('2020-07-17')
    },
    {
      id: 20,
      title: 'Футбол с сотрудниками',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[4],
      date: new Date('2020-06-12')
    }

  ];
}
