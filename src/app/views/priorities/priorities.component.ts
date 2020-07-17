import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Priority} from '../../model/Priority';
import {EditPriorityDialogComponent} from '../../dialog/edit-priority-dialog/edit-priority-dialog.component';
import {OperType} from '../../dialog/operType';

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.scss']
})
export class PrioritiesComponent implements OnInit {

  static defaultColor = '#fff';

  @Input()
  priorities: Priority[];

  @Output()
  deletePriority = new EventEmitter<Priority>();

  @Output()
  updatePriority = new EventEmitter<Priority>();

  @Output()
  addPriority = new EventEmitter<Priority>();



  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  openEditDialog(priority: Priority): void {
    // открытие диалогового окна
    const dialogRef = this.dialog.open(EditPriorityDialogComponent, {data: [priority.title, 'Редактирование приоритета', OperType.edit], autoFocus: false});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deletePriority.emit(priority);
        return;
      }
      //
      if (result) {
        priority.title = result as string;
        this.updatePriority.emit(priority);
        return;
      }
    });
  }

  openAddPriorityDialog(): void {

    const dialogRef = this.dialog.open(EditPriorityDialogComponent, {data: ['', 'Добавление приоритета', OperType.add], autoFocus: false} );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newPriority = new Priority(null, result as string, PrioritiesComponent.defaultColor);
        this.addPriority.emit(newPriority);
        return;
      }
    });
  }

  delete(priority: Priority): void {
    this.deletePriority.emit(priority);
  }
}
