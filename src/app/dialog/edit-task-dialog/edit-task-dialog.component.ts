import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string],
    private dataHandler: DataHandlerService
  ) { }

  private categories: Category[];
  private priorities: Priority[];
  private dialogTitle: string;
  private task: Task;
  public tmpTitle: string;
  private tmpCategory: Category;
  private tmpPriority: Priority;

  ngOnInit(): void {
    this.task = this.data[0]; // задача для редактирования/создания
    this.dialogTitle = this.data[1]; // текст для диалогового окна

    // инициализация начальных значений
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;

    this.dataHandler.getAllCategories().subscribe( items => this.categories = items);
    this.dataHandler.getAllPriorities().subscribe( items => this.priorities = items);
  }

  private onConfirm(): void {
    // считываем все значения для сохранения в поле задачи
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;

    // передаем добавленную/измененную задачу в обработчик
    this.dialogRef.close(this.task);
  }

  private onCancel(): void {
    this.dialogRef.close(null);
  }
}
