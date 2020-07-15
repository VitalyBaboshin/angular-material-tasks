import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AboutDialogComponent} from '../../dialog/about-dialog/about-dialog.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: Date;
  site = '#';
  blog = '#';
  siteName: 'Тестовое';

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.year = new Date();
  }

  openAboutDialog(): void {
    this.dialog.open(AboutDialogComponent, {autoFocus: false, data: {
      dialogTitle: 'О программе',
        message: 'Данное приложение было создано для ознакомления возможносте Angular, спасибо Тимуру'
      },
      width: '400px'
    });
  }
}
