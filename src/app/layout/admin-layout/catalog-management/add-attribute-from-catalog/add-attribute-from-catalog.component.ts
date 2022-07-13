import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { affiliateGroupState } from '../../../../reducers/affiliate-group-reducer';
import { Store } from '../../../../../../node_modules/@ngrx/store';
import { AddNewAttributefromCatalog } from '../../../../actions/catalog-management.action';

@Component({
  selector: 'app-add-attribute-from-catalog',
  templateUrl: './add-attribute-from-catalog.component.html',
  styleUrls: ['./add-attribute-from-catalog.component.css']
})
export class AddAttributeFromCatalogComponent implements OnInit {
  swatchColorCode = null;
  attributeValue = null;
  colorValue;
  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<any>,
  ) { }

  ngOnInit() {

  }

  colorPicker(e) {
    console.log('Color', e);
    this.swatchColorCode = e;
  }


  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.store.dispatch(
      new AddNewAttributefromCatalog({
        mcav: [
          {
            default1: 0,
            swatchColorCode: this.swatchColorCode,
            attributeValue: this.attributeValue,
          }
        ],
      }, this.data.id, this.data.attributeSetId)
    );

  }
}
