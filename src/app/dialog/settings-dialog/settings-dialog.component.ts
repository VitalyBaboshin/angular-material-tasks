import {Component, OnInit} from '@angular/core';
import {Priority} from '../../model/Priority';
import {MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../service/data-handler.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {
  priorities: Priority[];

  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>,
    private dataHandler: DataHandlerService
  ) { }

  ngOnInit(): void {
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    // console.log(this.data[0]);
  }

  public onClose(): void {
    this.dialogRef.close(false);
  }
}
