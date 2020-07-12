import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Task} from 'src/app/model/Task';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string]
  ) { }

  private dialogTitle: string;
  private task: Task;
  public tmpTitle: string;

  ngOnInit(): void {
    this.task = this.data[0]; // задача для редактирования/создания
    this.dialogTitle = this.data[1]; // текст для диалогового окна

    // инициализация начальных значений
    this.tmpTitle = this.task.title;
  }

  private onConfirm(): void {
    // считываем все значения для сохранения в поле задачи
    this.task.title = this.tmpTitle;

    // передаем добавленную/измененную задачу в обработчик
    this.dialogRef.close(this.task);
  }

  private onCancel(): void {
    this.dialogRef.close(null);
  }
}
