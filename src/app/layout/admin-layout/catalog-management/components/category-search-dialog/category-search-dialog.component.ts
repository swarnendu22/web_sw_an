import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-search-dialog',
  templateUrl: './category-search-dialog.component.html',
  styleUrls: ['./category-search-dialog.component.css']
})
export class CategorySearchDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CategorySearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() {
  }
}
