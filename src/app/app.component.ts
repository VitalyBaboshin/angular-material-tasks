import {Component, OnInit} from '@angular/core';
import {Task} from './model/Task';
import {DataHandlerService} from './service/data-handler.service';
import {Category} from './model/Category';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-practice2';
  tasks: Task[];
  categories: Category[];
  selectedCategory: Category;
  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
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

  }

  private onUpdateTask(task: Task): void {
    this.dataHandler.updateTask(task).pipe(
      mergeMap(() => this.dataHandler.searchTasks(this.selectedCategory, null, null, null) )
    ).subscribe(tasks => {
        this.tasks = tasks;
      });
  }
}
