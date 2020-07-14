import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';
import {mergeMap} from 'rxjs/operators';
import {Priority} from './model/Priority';

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
  public selectedCategory: Category = null;

  // поиск
  public searchTaskText = '';
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
    this.updateTasks();
  }

  public onUpdateTask(task: Task): void {
    this.dataHandler.updateTask(task).pipe(
      mergeMap(() => this.dataHandler.searchTasks(this.selectedCategory, null, null, null) )
    ).subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  public onDeleteTask(task: Task): void {
    this.dataHandler.deleteTask(task.id).pipe(
      mergeMap(() => this.dataHandler.searchTasks(this.selectedCategory, null, null, null) )
    ).subscribe(tasks => {
        this.tasks = tasks;
      });
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

}

