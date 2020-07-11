import {Component, OnInit} from '@angular/core';
import {Task} from '../../model/Task';
import {DataHandlerService} from '../../service/data-handler.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  // поля для таблицы( должны совпадать с названиями переменных класса)
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  public dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы
  tasks: Task[];
  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandler.taskSubject.subscribe(tasks => this.tasks = tasks);

    // dataSource Обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы)
    this.dataSource = new MatTableDataSource();
    this.refreshTable();
  }

  toogleTaskCompleted(task: Task): void {
    this.dataHandler.toogleTaskCompleted(task);
  }

  // в зависимости от статуса задачи - вернуть цвет названия
  private getPriorityColor(task: Task): string {

    // цвет завершенной задачи
    if (task.completed) {
      return '#f8f9fA';
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return '#fff';
  }

  private refreshTable(): void {
    this.dataSource.data = this.tasks;
  }
}
