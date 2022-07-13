import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges, SimpleChange
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-category-dropdown',
  templateUrl: './category-drop-down.component.html',
  styleUrls: ['./category-drop-down.component.css']
})
export class CategoryDropDownComponent implements OnDestroy, AfterViewInit, OnChanges {
  @Input() selectData: Array<[]>;
  @Input() labelFor: string;
  @Input() selectedOption: any;
  @Input() multiSelection: boolean;
  @Input() getAllObjects: boolean;
  @Output() selectionChangeValue = new EventEmitter();
  @Input() disable: boolean;

  /** control for the selected bank for option groups */
  public selectionCtrl = null;
  public selectStr;
  multiSelectArr = [];
  getAllObjectsArr = [];
  public searchText = null;
  // /** control for the MatSelect filter keyword for option groups */
  protected _onDestroy = new Subject<void>();


  constructor() {
    // this.selectionCtrl = this.selectedOption;
  }
  @ViewChild('categoryDropdown') selectBlock: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    this.selectStr = `<option value=null>${this.labelFor}</option>`;
    this.categoryOptions(this.selectData);
  }

  ngAfterViewInit() {
    this.setUpInitailData();
  }
  setUpInitailData() {
    let categories = this.selectData ? this.selectData : [];
    this.selectStr = `<option value=null>${this.labelFor}</option>`;
    this.categoryOptions(categories);
    this.selectBlock.nativeElement.innerHTML = this.selectStr;
  }
  searchType(event) {
    console.log(event.target.value);
    const data = event.target.value.toLowerCase().trim();
    if (data.length > 2) {
      const filterArr = this.getAllObjectsArr.filter(i => i.name.includes(data));
      if (filterArr.length > 0) {
        console.log(filterArr);
        this.selectStr = ``;
        filterArr.forEach(filterItem => {
          const levelArr = filterItem.path.split('/');
          levelArr.splice(0, 1);
          const idArr = filterItem.ancestry.split('/');
          idArr.splice(0, 1);
          idArr.push(filterItem.id);
          levelArr.forEach((element, index) => {
            const level = index + 3;
            let spaces = '';
            for (let k = 0; k < 3 * (level - 2); k++) {
              spaces += '&nbsp;';
            }
            const mainCategory = this.formatOptions(element, idArr[index]);
            this.selectStr += `<option value=${mainCategory}>${spaces}${element}</option>`;

          });
        })
        this.selectBlock.nativeElement.innerHTML = this.selectStr;
      }
    } else {
      this.setUpInitailData();
    }
  }
  formatOptions(name, id) {
    let formatName = name.replace(/[0-9/&,%]/g, '');
    return JSON.stringify({ name: formatName.replace(/\s/g, '-'), id });
  }
  categoryOptions(item) {
    for (let i = 0; i < item.length; i++) {
      const mainCategory = this.formatOptions(item[i]['name'], item[i]['id']);
      let spaces = '';
      const level = item[i]['level'];
      for (let k = 0; k < 3 * (level - 2); k++) {
        spaces += '&nbsp;';
        // }
      }
      if (item[i].products == true) {
        if (this.selectedOption) {
          if (!this.multiSelection) {
            if (this.selectedOption.id === item[i]['id']) {
              this.selectionCtrl = mainCategory;
            }
          } else {
            this.selectedOption.forEach(option => {
              console.log('Option', option, 'Item', item[i]['id']);
              if (option.id === item[i]['id']) {
                this.multiSelectArr.push(JSON.parse(mainCategory));
              }
            });
          }
        }
        this.selectStr += `<option value=${mainCategory}>${spaces}${item[i]['name']}</option>`;
      } else {
        this.selectStr += `<option style="font-weight:bold" value=null disabled>${spaces}${item[i]['name']}</option>`;
      }
      if (item[i]['childList'] && item[i]['childList'].length > 0) {
        this.categoryOptions(item[i].childList)
      }
      if (this.getAllObjects) {
        this.getAllObjectsArr.push(item[i]);
      }
    }

  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    // this.selectionCtrl = null;

  }
  deleteSelection(index) {
    const lastElementDeleted = this.multiSelectArr.length - 1 === index ? true : false;
    this.multiSelectArr.splice(index, 1);
    if (this.multiSelectArr.length === 0 || lastElementDeleted) {
      this.selectionCtrl = null;
    }
    this.selectionChangeValue.emit(this.multiSelectArr);
  }
  onSelectionChange(e) {
    if (this.selectionCtrl) {
      if (this.multiSelection) {
        const valueFound = JSON.parse(this.selectionCtrl);
        const indexExists = this.multiSelectArr.findIndex(item => item.id === valueFound.id);
        if (indexExists < 0) {
          this.multiSelectArr.push(valueFound);
          const payload = this.getAllObjects ? this.createObjectForMoreThenOneParams(this.multiSelectArr) : this.multiSelectArr;
          this.selectionChangeValue.emit(payload);
        } else {
          alert('Option Already Selected');
        }
      } else {
        const payload = this.getAllObjects ? this.createObjectForMoreThenOneParams(this.selectionCtrl) : this.selectionCtrl;
        this.selectionChangeValue.emit(payload);
      }
    }
  }
  createObjectForMoreThenOneParams(selectionValue) {
    return { selectedItem: selectionValue, allObjects: this.getAllObjectsArr };
  }
}
