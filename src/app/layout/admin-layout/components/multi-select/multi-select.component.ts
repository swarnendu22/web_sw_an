import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() selectData: Array<[]>;
  @Input() labelFor: string;
  @Input() multiple: boolean;
  @Output() selectionChangeValue = new EventEmitter();
  // protected bankGroups: BankGroup[] = BANKGROUPS;

  /** control for the selected bank for option groups */
  public selectionCtrl = null;

  // /** control for the MatSelect filter keyword for option groups */
  // public bankGroupsFilterCtrl: FormControl = new FormControl();

  // /** list of bank groups filtered by search keyword for option groups */
  // // public filteredBankGroups: ReplaySubject<BankGroup[]> = new ReplaySubject<BankGroup[]>(1);

  // /** Subject that emits when the component has been destroyed. */
  // public filteredBankGroups = [];
  protected _onDestroy = new Subject<void>();


  constructor() { }
  @ViewChild('multiSelect') selectBlock: ElementRef;
  ngOnInit() {
  }
  ngAfterViewInit() {

    // console.log("--Welcome to category multiselect--");
    // console.log("idOfSelectBox :: "+idOfSelectBox);

    let categories = this.selectData ? this.selectData : [];

    var selectStr = "";
    // loop
    selectStr += `<option value=null>${this.labelFor}</option>`;

    for (let i = 0; i < categories.length; i++) {
      let name = categories[i]['name'].replace(/[0-9/&,%]/g, '');
      let mainCategory =
        JSON.stringify({ name: name.replace(/\s/g, "-"), id: categories[i]['id'] })

      selectStr += `<option style="font-weight:bold" value=${mainCategory}>${categories[i]['name']}</option>`;

      let childList = categories[i]['childList'];
      for (let j = 0; j < childList.length; j++) {
        // console.log(typeof categories[j].ancestry+" --> " +categories[j].ancestry + "-->" + categories[j].ancestry)
        let name = childList[j].name.replace(/[0-9/&,%]/g, '');
        var innerCategorySets = JSON.stringify({ name: name.replace(/\s/g, "-"), id: childList[j]['id'] });
        selectStr += `<option value=${innerCategorySets}>&nbsp;&nbsp;&nbsp;${childList[j]['name']}</option>`;
        /*

        \\\\\\\\\\\
        (childList[j].id)
        \\\\\\\\\\\\

        childListLevel3 = childList[j].childList;
        for(k=0;k<childListLevel3.length;k++){

            selectStr += "<option value=\""+childListLevel3[k].id+"\">";
            selectStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+childListLevel3[k].name+"</option>";

        }

         */
        /* selectStr += "</optgroup>"; */
      }

      selectStr += "</optgroup>";

    }
    this.selectBlock.nativeElement.innerHTML = selectStr;
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  onSelectionChange(e) {
    if (this.selectionCtrl) {
      this.selectionChangeValue.emit(this.selectionCtrl);
    }
  }

  // protected filterBankGroups() {
  //   if (!this.bankGroups) {
  //     return;
  //   }
  //   // get the search keyword
  //   let search = this.bankGroupsFilterCtrl.value;
  //   const bankGroupsCopy = this.copyBankGroups(this.bankGroups);
  //   if (!search) {
  //     this.filteredBankGroups.next(bankGroupsCopy);
  //     return;
  //   } else {
  //     search = search.toLowerCase();
  //   }
  //   // filter the banks
  //   this.filteredBankGroups.next(
  //     bankGroupsCopy.filter(bankGroup => {
  //       const showBankGroup = bankGroup.name.toLowerCase().indexOf(search) > -1;
  //       if (!showBankGroup) {
  //         bankGroup.banks = bankGroup.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1);
  //       }
  //       return bankGroup.banks.length > 0;
  //     })
  //   );
  // }

  // protected copyBankGroups(bankGroups: BankGroup[]) {
  //   const bankGroupsCopy = [];
  //   bankGroups.forEach(bankGroup => {
  //     bankGroupsCopy.push({
  //       name: bankGroup.name,
  //       banks: bankGroup.banks.slice()
  //     });
  //   });
  //   return bankGroupsCopy;
  // }<mat-select [formControl]="selectionCtrl" multiple (selectionChange)="onSelectionChange()">
  //     <!-- < ngx - mat - select - search[formControl]="bankGroupsFilterCtrl" > </ngx-mat-select-search> -->
  //   < mat - option * ngFor="let group of selectData" >
  //     {{ group.name }}
  // <span>
  //   <mat-option * ngFor="let child of group.childList"[value] = "child" >
  //     {{ child.name }}
  // </mat-option>
  //   < /span>
  //   < /mat-option>
  //   < /mat-select>

}
