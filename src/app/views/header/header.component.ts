import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SettingsDialogComponent} from '../../dialog/settings-dialog/settings-dialog.component';
import {Priority} from '../../model/Priority';
import {IntroService} from '../../service/intro.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private priorities: Priority[];
  @Input()
  categoryName: string;

  @Input()
  showStat: boolean;

  @Output()
  toggleStat = new EventEmitter<boolean>();

  @Output()
  toggleMenu = new EventEmitter(); // показать/скрыть меню

  constructor(
    private dialog: MatDialog,
    private introService: IntroService
  ) { }

  ngOnInit(): void {
  }

  onToggleStat(): void {
    this.toggleStat.emit(!this.showStat);
  }

  // окно настроек
  showSettings(): void {
    const dialogRef = this.dialog.open(SettingsDialogComponent,
      {
        autoFocus: false,
        width: '500px'
      });
  }

  showIntro(): void {
    this.introService.startIntroJS(false);
  }

  onToggleMenu(): void {
    this.toggleMenu.emit(); // показать/скрыть меню
  }
}
