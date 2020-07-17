import {Component, Inject, OnInit} from '@angular/core';
import {Priority} from '../../model/Priority';
import {OperType} from '../operType';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.scss']
})
export class EditPriorityDialogComponent implements OnInit {

  priorityTitle: string;
  dialogTitle: string;
  operType: OperType;
  tmpTitle: string;

  constructor(
    private dialogRef: MatDialogRef<Priority>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType],
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.priorityTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];
    this.tmpTitle = this.priorityTitle;
  }

  onConfirm(): void {
    this.dialogRef.close(this.priorityTitle);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить приоритет: "${this.priorityTitle}"? (Будет значение - без приоритета)`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe( result => {
        if (result) {
          this.dialogRef.close('delete');
        }
      }
    );
  }
}
