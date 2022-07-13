import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetCategoriesElasticGlobal } from '../../../../actions/storeManagement.action';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Observable, Subscriber } from 'rxjs/Rx';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
 interface FoodNode {
  name: string;
  children?: FoodNode[];
  countProduct: number;
  id: number;
  key: string;
  levelCat: string;
  path: string;
  ancestry: string;
}

var TREE_DATA: any;

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-categories-list-serach',
  templateUrl: './categories-list-search.component.html',
  styleUrls: ['./categories-list-search.component.css']
})
export class CategoriesListSearchComponent implements OnInit {
  @ViewChild('selectList', { static: false }) selectList: ElementRef;
  categories = [];
  categoryName = '';
  subTimeout3: Subscription;

  pageNo = 0;
  pageSize = 20;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      countProduct: node.countProduct,
      id: node.id,
      key: node.key,
      levelCat: node.levelCat,
      path: node.path,
      ancestry: node.ancestry
    };
  }
  
  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private store: Store<any>, 
    public dialogRef: MatDialogRef<CategoriesListSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.store.pipe(select('manageCategories')).subscribe(res => {
      this.categories = [];
      if (res.categoriesElasticGlobal) {
        let allTreeCat1 = res.categoriesElasticGlobal.aggregations.agg_tree_l1.buckets
          allTreeCat1.forEach(element => {
          var splitted = element.key.split("|", 3); 
          if(element.agg_tree_l2?.buckets.length > 0)
          {
            if(this.childCategory2(element.agg_tree_l2.buckets, splitted).length)
            {
              this.categories.push({
                name: splitted[2],
                id: splitted[1],
                key: element.key,
                children: this.childCategory2(element.agg_tree_l2.buckets, splitted),
                countProduct: element.doc_count,
                levelCat: 1,
                path: '',
                ancestry: '',
              })
            }
          }
          // else{
          //   this.categories.push({
          //     name: splitted[2],
          //     id: splitted[1],
          //     key: element.key,
          //     children: [],
          //     countProduct: element.doc_count,
          //     levelCat: 1,
          //     path: '',
          //     ancestry: '',
          //   })
          // }
        });
        TREE_DATA = this.categories;
        this.dataSource.data = TREE_DATA;
      } else {
        this.searchCatList();
      }
    });
  }
  childCategory2(allTreeCat2: any, splitted) {
    let childCategory2 = [];
    allTreeCat2.forEach(element => {
      var splitted2 = element.key.split("|", 3); 
      if(element.agg_tree_l3?.buckets.length > 0)
      {
        if(this.childCategory3(element.agg_tree_l3.buckets, splitted, splitted2).length)
        {
          childCategory2.push({
            name: splitted2[2],
            key: element.key,
            id: splitted2[1],
            children: this.childCategory3(element.agg_tree_l3.buckets, splitted, splitted2),
            countProduct: element.doc_count,
            levelCat: 2,
            path: '',
            ancestry: '',
          })
        }
      }
      else{
        childCategory2.push({
          name: splitted2[2],
          key: element.key,
          id: splitted2[1],
          children: [],
          countProduct: element.doc_count,
          levelCat: 2,
          path: splitted[2] + " >> " + splitted2[2],
          ancestry: splitted[1] + "." + splitted2[1],
        })
      }
    });
    return childCategory2;
  }
  childCategory3(allTreeCat3: any, splitted, splitted2) {
    let childCategory3 = [];
    allTreeCat3.forEach(element => {
      var splitted3 = element.key.split("|", 3); 
      childCategory3.push({
        name: splitted3[2],
        id: splitted3[1],
        key: element.key,
        countProduct: 0,
        levelCat: 3,
        path: splitted[2] + " >> " + splitted2[2] + " >> " +  splitted3[2],
        ancestry: splitted[1] + "." + splitted2[1] + "." +  splitted3[1],
      })
    });
    return childCategory3;
  }
  catListByName() {
    if (this.subTimeout3) {
      this.subTimeout3.unsubscribe();
    }
    this.subTimeout3 = Observable.timer(500).subscribe(() => { 
      this.searchCatList();
    });
  }
  searchCatList() {
    let payloadCatSerach = {
      categoryName: this.categoryName,
      depth: 3,
      level: 1
    }
    this.store.dispatch(new GetCategoriesElasticGlobal(payloadCatSerach));
  }
  selectCat(path, id, ancestry) {
    console.log( path, id, ancestry );
    if(path!='' && ancestry!='') {
      let data = {
        'path': path,
        'id':id,
        'ancestry': ancestry
      }
      this.dialogRef.close(data);
    }
  }
  changeSource(event){
    event.target.src = 'https://ndh.imgix.net/ndh-assets/categories-images/default.png';
  }
  ngOnDestroy() {
    if (this.subTimeout3) {
      this.subTimeout3.unsubscribe();
    }
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}