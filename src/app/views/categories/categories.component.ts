import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {MatDialog} from '@angular/material/dialog';
import {EditCategoryComponent} from '../../dialog/edit-category/edit-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  // для отображения иконки редактирования при наведении на категорию
  public indexMouseMove: number;
  public searchCategoryTitle: string; // текущее значение для поиска категории
  @Input()
  categories: Category[];

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Input()
  selectedCategory: Category;

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  addCategory = new EventEmitter<Category>();

  @Output()
  searchCategory = new EventEmitter<string>();

  constructor(private dataHandler: DataHandlerService,
              private dialog: MatDialog
  ) { }

  showTasksByCategory(category: Category): void {

    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category; // сохраняем выбранную категорию

    // вызываем внешний обработчик и передаем туда выбранную категорию
    this.selectCategory.emit(this.selectedCategory);
  }

  public openEditDialog(category: Category): void {
    // открытие диалогового окна
    const dialogRef = this.dialog.open(EditCategoryComponent, {data: [category, 'Редактирование категории', 1], autoFocus: false});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCategory.emit(category);
        return;
      }
    //
      if (result as Category) {
        this.updateCategory.emit(category);
        return;
      }
    });
  }

  public openAddCategoryDialog(): void {

    const category = new Category(null, null);
    // открытие диалогового окна
    const dialogRef = this.dialog.open(EditCategoryComponent, {data: [category, 'Редактирование категории', 0], autoFocus: false});

    dialogRef.afterClosed().subscribe(result => {
      if (result ) {
        this.addCategory.emit(category);
        return;
      }
    });
  }

  public showEditIcon(index: number): void {
    this.indexMouseMove = index;
  }

  // поиск категории
  search(): void {

    // текстовое поле пустое то выходим из метода
    if (this.searchCategoryTitle == null) {
      return;
    }
    //
    this.searchCategory.emit(this.searchCategoryTitle);
  }
}
