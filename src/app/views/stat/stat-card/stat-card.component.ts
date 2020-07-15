import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent implements OnInit {

  @Input()
  completed = false;

  @Input()
  iconName: string;

  @Input()
  count1: number | string;

  @Input()
  countTotal: number | string;

  @Input()
  title: string;
  constructor() { }

  ngOnInit(): void {
  }

}
