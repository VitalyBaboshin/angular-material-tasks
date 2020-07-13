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

  public indexMouseMove: number;

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
    const dialogRef = this.dialog.open(EditCategoryComponent, {data: [category, 'Редактирование категории'], autoFocus: false});

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

  public showEditIcon(index: number): void {
    this.indexMouseMove = index;
  }
}
