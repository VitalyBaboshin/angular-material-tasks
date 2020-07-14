import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Task} from 'src/app/model/Task';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperType} from '../operType';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, OperType],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) { }

  public categories: Category[];
  public priorities: Priority[];
  public dialogTitle: string;
  public task: Task;
  public operType: OperType;
  public tmpTitle: string;
  public tmpCategory: Category;
  public tmpPriority: Priority;
  public tmpDate: Date;

  ngOnInit(): void {
    this.task = this.data[0]; // задача для редактирования/создания
    this.dialogTitle = this.data[1]; // текст для диалогового окна
    this.operType = this.data[2];

    // инициализация начальных значений
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate = this.task.date;

    this.dataHandler.getAllCategories().subscribe( items => this.categories = items);
    this.dataHandler.getAllPriorities().subscribe( items => this.priorities = items);
  }

  public onConfirm(): void {
    // считываем все значения для сохранения в поле задачи
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;

    // передаем добавленную/измененную задачу в обработчик
    this.dialogRef.close(this.task);
  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }

  public delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  public toogleCompleted(message: string): void {
    this.dialogRef.close(message);
  }
}
