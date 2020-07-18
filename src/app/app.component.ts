import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';
import {concatMap, map} from 'rxjs/operators';
import {Priority} from './model/Priority';
import {zip} from 'rxjs';
import {IntroService} from './service/intro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // коллекция категорий с количеством незавершенных задач для каждой из них
  public categoryMap = new Map<Category, number>();

  title = 'angular-practice2';
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];

  // для статистики
  totalTasksCountInCategory: number;
  completedTasksCountInCategory: number;
  uncompleteTasksCountInCategory: number;
  uncompletedTotalTasksCount: number;
  statVisible = true; // во время инициализации, показать / скрыть статистику

  public selectedCategory: Category = null;

  // поиск
  public searchTaskText = '';
  public searchCategoryText = '';
  // фильтрация
  public statusFilter: boolean;
  public priority: Priority;

  // параметры бокового меню с категориями
  menuOpened: boolean; // открыть-закрыть
  menuMode: string; // тип выдвижения (поверх, с толканием и пр.)
  menuPosition: string; // сторона
  showBackdrop: boolean; // показывать фоновое затемнение или нет

  constructor(
    private dataHandler: DataHandlerService,
    private introService: IntroService
  ) {
    this.setMenuValues(); // установить настройки меню
  }

  ngOnInit(): void {
    // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);

    this.fillCategories();
    this.onSelectCategory(null);

    this.introService.startIntroJS(true);
  }

  // отображение задач по выбранной категории
  public onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    this.updateTasksAndStats();
  }

  /** Обновление задачи */
  public onUpdateTask(task: Task): void {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.fillCategories();
      this.updateTasksAndStats();
    });
  }

  /** Удаление задачи */
  public onDeleteTask(task: Task): void {
    this.dataHandler.deleteTask(task.id).pipe(
      concatMap((t) => {
          return this.dataHandler.getUncompletedCountInCategory(t.category)
            .pipe(map(count => {
              return ({t, count});
            }));
        }
      )).subscribe(result => {
      const t = result.t as Task;
      this.categoryMap.set(t.category, result.count);
      this.updateTasksAndStats();
    });

  }

  /** заполняет категории и кол-во невыполненых задач по каждой из них */
  private fillCategories(): void {
    if (this.categoryMap) {
      this.categoryMap.clear();
    }

    this.categories = this.categories.sort((a, b) => a.title.localeCompare(b.title));

    this.categories.forEach((cat) => {
      this.dataHandler.getUncompletedCountInCategory(cat).subscribe((count) => this.categoryMap.set(cat, count));
    });

  }

  public onUpdateCategory(category: Category): void {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.categories[category.id - 1] = category;
    });
  }

  public onDeleteCategory(category: Category): void {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null;
      this.categoryMap.delete(category);
      this.onSelectCategory(this.selectedCategory);
      this.updateTasks();
    });
  }

  // поиск задач
  public onSearchTask(searchString: string): void {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  // фильтрация задач по статусу (все, решенные, не решенные)
  public onFilterTaskByStatus(status: boolean): void {
    this.statusFilter = status;
    this.updateTasks();
  }

  public onFilterTaskByPriority(priority: Priority): void {
    this.priority = priority;
    this.updateTasks();
  }

  /** Обновить список задач */
  public updateTasks(): void {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priority
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  /** Добавление задачи */
  public onAddTask(task: Task): void {
    this.dataHandler.addTask(task).pipe(// сначала добавляем задачу
      concatMap(task => { // используем добавленный task (concatMap - для последовательного выполнения)
          // .. и считаем кол-во задач в категории с учетом добавленной задачи
          return this.dataHandler.getUncompletedCountInCategory(task.category).pipe(map(count => {
            return ({t: task, count}); // в итоге получаем массив с добавленной задачей и кол-вом задач для категории
          }));
        }
      )).subscribe(result => {

      const t = result.t as Task;

      // если указана категория - обновляем счетчик для соотв. категории
      if (t.category) {
        this.categoryMap.set(t.category, result.count);
      }

      this.updateTasksAndStats();

    });
  }

  /** Добавление категории */
  public onAddCategory(title: Category): void {
    this.dataHandler.addCategory(title).subscribe(result => {
      this.fillCategories();
    });
  }

  onSearchCategory(title: string): void {
    this.searchCategoryText = title;
    this.dataHandler.searchCategory(title).subscribe(categories => {
      this.categories = categories;
      this.fillCategories();
    });
  }

  private updateTasksAndStats(): void {
    this.updateTasks();
    this.updateStats();
  }

  /** Обновить статистику */
  private updateStats(): void {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedTotalCount())
      .subscribe(array => {
        this.totalTasksCountInCategory = array[0];
        this.completedTasksCountInCategory = array[1];
        this.uncompleteTasksCountInCategory = array[2];
        this.uncompletedTotalTasksCount = array[3];
      });
  }

  visibleStat(visible: boolean): void {
    this.statVisible = visible;
  }

  // если закрыли меню любым способом - ставим значение false
  onClosedMenu(): void {
    this.menuOpened = false;
  }

  // параметры меню
  setMenuValues(): void {
    this.menuPosition = 'left'; // расположение слева
    this.menuOpened = true; // меню сразу будет открыто по-умолчанию
    this.menuMode = 'push'; // будет "толкать" основной контент, а не закрывать его
    this.showBackdrop = false; // показывать темный фон или нет (нужно больше для мобильной версии)

  }

  // показать-скрыть меню
  toggleMenu(): void {
    this.menuOpened = !this.menuOpened;
  }
}

