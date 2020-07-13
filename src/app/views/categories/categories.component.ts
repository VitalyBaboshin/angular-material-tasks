import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  @Input()
  categories: Category[];

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Input()
  selectedCategory: Category;

  constructor(private dataHandler: DataHandlerService) { }

  // ngOnInit(): void {
  //   this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  // }

  showTasksByCategory(category: Category): void {

    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category; // сохраняем выбранную категорию

    // вызываем внешний обработчик и передаем туда выбранную категорию
    this.selectCategory.emit(this.selectedCategory);
  }
}
