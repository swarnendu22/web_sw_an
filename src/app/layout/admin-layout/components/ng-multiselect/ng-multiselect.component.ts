import { Component, Injectable, ChangeDetectorRef } from "@angular/core";
import {
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
import { SelectionModel } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import {
  MatTreeFlattener,
  MatTreeFlatDataSource
} from "@angular/material/tree";
import { of as ofObservable, Observable, BehaviorSubject } from "rxjs";
import { Store, select } from '@ngrx/store';
import { GetProductCategoryParentSearch, StoreProductCategoryParentSearch } from './../../../../actions/components.actions';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: any;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: any;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */

var treeData: any;



@Component({
  selector: 'app-ng-multiselect',
  templateUrl: './ng-multiselect.component.html',
  styleUrls: ['./ng-multiselect.component.css']
})

export class NgMultiselectComponent implements OnChanges, OnDestroy {
  @Input() selectData: Array<[]>;
  @Input() parentCategory: boolean;
  @Input() leafCategory: boolean;
  @Input() allCategory: boolean;
  @Input() resetSelection: boolean;
  @Input() label: string;
  @Input() selectedOption: Array<any> = [];
  @Input() disabled: boolean = false;
  @Input() requestedIdData: Array<any> = [];
  @Output() getSelectedValue = new EventEmitter();
  @Output() getRequestedIdValue = new EventEmitter();
  prevData = [];
  prevSelection = [];
  disableButton = true;
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap: Map<TodoItemFlatNode, TodoItemNode> = new Map<
    TodoItemFlatNode,
    TodoItemNode
  >();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap: Map<TodoItemNode, TodoItemFlatNode> = new Map<
    TodoItemNode,
    TodoItemFlatNode
  >();

  /** A selected parent node to be inserted */
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName: string = "";

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true);

  ngOnChanges() {

    treeData = this.selectData;
    this.initialize();
    if (this.resetSelection) {
      this.checklistSelection.clear();
    }
  }
  ngOnDestroy() {
    this.prevData = [];
    this.prevSelection = [];
  }
  constructor(private store: Store<any>, private detector: ChangeDetectorRef) {
    treeData = this.selectData;
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
    // On checklist selection change subscribe.
    this.checklistSelection.changed.subscribe(res => {
      this.getSelectedValue.emit(this.checklistSelection.selected);
    });
    this.dataSource._flattenedData.subscribe(res => {
      const currentData = res;
      const currentSelection = this.selectedOption;
      // if (this.prevSelection !== currentSelection) {
      this.prevData = currentData;
      this.prevSelection = currentSelection;
      this.checklistSelection.clear();
      if (this.selectedOption.length > 0) {
        let requestedNodes = [];
        let haveRequestedData = false;
        this.selectedOption.forEach(id => {
          console.log('IDS:::', id);
          requestedNodes = [];
          res.forEach(node => {
            // In case of approve request get categoryName of requested Ids.
            if (this.requestedIdData.length > 0) {
              console.log('REQUESTED_DAU', this.requestedIdData);
              haveRequestedData = true;
              // this.requestedIdData.find(reqId => reqId != id ? node.item.id == reqId : false);

              const requestedId = this.requestedIdData.find(reqId => {
                console.log('REQ_IS', reqId, id, node.item.id)
                if (parseInt(reqId, 10) != id) {
                  console.log('ENTERDRE', node.item.id == parseInt(reqId, 10))
                  return (node.item.id == parseInt(reqId, 10));
                } else {
                  return false;
                }
              })
              if (requestedId) {
                requestedNodes.push(node.item);
              }
            }
            const foundNode = node.item.id == id;
            if (foundNode) {
              this.checklistSelection.select(node);
            }
            // console.log(node.item.id == id);
            // return node.item.id == id;
          });
          // if (foundNode) {
          //   this.checklistSelection.select(foundNode);
          // }
        });
        if (haveRequestedData) {
          this.getRequestedIdValue.emit(requestedNodes);
        }

      }
      // this.detector.detectChanges();

      // }
    });
    // Store Subscription For Search.
    this.store.pipe(select('componentsLayout')).subscribe(res => {
      if (res.categoryParentSearchDetails) {
        treeData = res.categoryParentSearchDetails.payload;
        this.initialize();
      }
    });
  }

  getLevel = (node: TodoItemFlatNode) => {
    return node.level;
  };

  isExpandable = (node: TodoItemFlatNode) => {
    return node.expandable;
  };

  getChildren = (node: TodoItemNode): Observable<TodoItemNode[]> => {
    return ofObservable(node.children);
  };

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => {
    return _nodeData.expandable;
  };

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => {
    return _nodeData.item === "";
  };

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    let flatNode =
      this.nestedNodeMap.has(node) &&
        this.nestedNodeMap.get(node)!.item === node.item
        ? this.nestedNodeMap.get(node)!
        : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };
  checkIfExists(node) {
    const index = this.checklistSelection.selected.findIndex(i => i.item.id == node.item.id);
    if (index >= 0) {
      return true;
    } else {
      return false;
    }
  }
  toggleCheckbox(node) {
    console.log('toggle', this.checklistSelection.isSelected(node));
    // const index = this.checklistSelection.selected.findIndex(i=>i.item.id==node.item.id);
    // if(index>=0){
    //   this.checklistSelection.;
    // }else{
    //   this.checklistSelection.select(node);
    // }
  }
  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child =>
      this.checklistSelection.isSelected(child)
    );
    // console.log("=================this.checklistSelection:::::::::", this.checklistSelection);
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    // console.log('Function called.....................')
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    console.log('NODE SELECTION', this.checklistSelection.isSelected);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }


  searchCategory(event) {
    console.log(event.target.value);
    const inputValue = event.target.value.toString().trim();
    if (inputValue.length > 3) {
      this.store.dispatch(new GetProductCategoryParentSearch({ name: inputValue }));
    }
  }
  getSelectedNames() {
    const parentName = [];
    const childName = [];
    this.checklistSelection.selected.forEach(selected => {
      if (selected.item.products) {
        childName.push(selected.item.name);
      } else {
        parentName.push(selected.item.name);
      }
    });
    if (parentName.length > 0) {
      return getName(parentName);
    } else if (childName.length > 0) {
      return getName(childName);
    } else {
      return this.label;
    }
    function getName(nameArr) {
      return nameArr.length > 1 ? `${nameArr[0]} +(${nameArr.length - 1} Other)` : `${nameArr[0]}`;
    }
  }
  getDisabledValue(node) {
    if (this.allCategory) {
      return false;
    } else {
      return (this.leafCategory && !node.item.products);
    }
  }
  // getCurrentSelectedValue() {
  //   this.getCurrentSelectedValue(this.checklistSelection.sel)
  // }
  /////////////Service///////////////////

  dataChange: BehaviorSubject<TodoItemNode[]> = new BehaviorSubject<
    TodoItemNode[]
  >([]);

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }


  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(treeData, 0);
    // Notify the change.
    this.dataChange.next(data);
    this.dataSource.data = data;
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(value: any, level: number) {
    let data: any[] = [];
    for (let k in value) {
      let v = value[k];
      let node = new TodoItemNode();
      node.item = v;
      if (v.childList.length === 0 || v.childList === undefined) {
        // no action
      } else if (v.childList.length > 0) {
        node.children = this.buildFileTree(v.childList, level + 1);
      } else {
        node.item = v;
      }
      data.push(node);
    }
    return data;
  }
  buildFilterData(value: any, level: number) {
    let data: any[] = [];
    let dataTree: any[] = [];
    for (let k in value) {
      let v = value[k].item;
      console.log("VALUE found", v);
      if (v.ancestry) {
        const ancestryArr = v.ancestry.split('/');
        ancestryArr.splice(0, 1);
        const dataItem = [];
        ancestryArr.forEach(element => {
          console.log('ID', element);

          dataItem.push(this.dataSource._flattenedData.value.filter(node => node.item.id.toString() === element)[0].item);
        });
        console.log(dataItem);

      }
    }
  }

  buildSearchTree(selectedItemIds, dataTree) {
    selectedItemIds.forEach(id => {
      if (dataTree.findIndex(data => data.id === id) == -1) {
        this.dataSource._flattenedData.value.filter(node => node.item.id.toString() === id)
      }
    })
  }
  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    const child = <TodoItemNode>{ item: name };
    if (parent.children) {
      parent.children.push(child);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}
