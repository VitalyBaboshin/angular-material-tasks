import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';
import {mergeMap} from 'rxjs/operators';
import {Priority} from './model/Priority';
import {zip} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-practice2';
  tasks: Task[];
  categories: Category[];
  priorities: Priority[];

  // для статистики
  totalTasksCountInCategory: number;
  completedTasksCountInCategory: number;
  uncompleteTasksCountInCategory: number;
  uncompletedTotalTasksCount: number;

  public selectedCategory: Category = null;

  // поиск
  public searchTaskText = '';
  public searchCategoryText = '';
  // фильтрация
  public statusFilter: boolean;
  public priority: Priority;

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.onSelectCategory(null);
    this.updateStats();
  }

  // отображение задач по выбранной категории
  public onSelectCategory(category: Category): void {
    this.selectedCategory = category;
    this.dataHandler.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    ).subscribe((tasks: Task[]) => {
        this.tasks = tasks;
    });
    this.updateTasksAndStats();

  }

  /** Обновление задачи */
  public onUpdateTask(task: Task): void {
    this.dataHandler.updateTask(task).pipe(
      mergeMap(() => this.dataHandler.searchTasks(this.selectedCategory, null, null, null) )
    ).subscribe(tasks => {
        this.tasks = tasks;
      });
    this.updateStats();
  }

  /** Удаление задачи */
  public onDeleteTask(task: Task): void {
    this.dataHandler.deleteTask(task.id).pipe(
      mergeMap(() => this.dataHandler.searchTasks(this.selectedCategory, null, null, null))
    ).subscribe(tasks => {
        this.tasks = tasks;
      });
    this.updateStats();
  }

  public onUpdateCategory(category: Category): void {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.categories[category.id - 1] = category;
    });
  }

  public onDeleteCategory(category: Category): void {
    this.dataHandler.deleteCategory(category.id).subscribe( cat => {
        this.selectedCategory = null;
        this.onSelectCategory(this.selectedCategory);
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
    this.dataHandler.addTask(task).subscribe( result => {
      this.updateTasksAndStats();
    });
  }

  /** Добавление категории */
  public onAddCategory(category: Category): void {
    this.dataHandler.addCategory(category).subscribe( result => {
      this.updateTasksAndStats();
    });
  }

  onSearchCategory(title: string): void {
    this.searchCategoryText = title;
    this.dataHandler.searchCategory(title).subscribe(categories => {
      this.categories = categories;
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
}

