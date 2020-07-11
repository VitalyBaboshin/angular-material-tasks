import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {Task} from '../../model/Task';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.categories = this.dataHandler.getCategories();
    console.log(this.categories);
  }

  showTasksByCategory(category: Category): Task[] {
    return this.dataHandler.getTaskByCategory(category);
  }
}
