import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../../model/Category';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperType} from '../operType';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<Category>,
    @Inject(MAT_DIALOG_DATA) private data: [Category, string, OperType],
    private dialog: MatDialog
  ) { }

  public dialogTitle: string;
  public category: Category;
  public operType: OperType;
  public tmpTitle: string;

  ngOnInit(): void {
    this.category = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];
    this.tmpTitle = this.category.title;
  }

  public onConfirm(): void {
    this.category.title = this.tmpTitle;
    this.dialogRef.close(this.category);
  }

  public onCancel(): void {
    this.dialogRef.close(null);
  }

  public delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${this.category.title}"? (сами задачи не удалятся)`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }
}
