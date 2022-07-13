import { Component, Injectable } from "@angular/core";
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
import { of as ofObservable, Observable, BehaviorSubject, Subscription } from "rxjs";
import { Store, select } from '@ngrx/store';
import { GetProductCategoryParentSearch, StoreProductCategoryParentSearch } from './../../../../actions/components.actions';
import { GetParentCategory } from '../../../../actions/storeManagement.action';

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
  selector: "app-ng-select",
  templateUrl: "./ng-select.component.html",
  styleUrls: ["./ng-select.component.css"],
  // providers: [ChecklistDatabase]
})
export class NgSelectComponent implements OnChanges, OnDestroy {
  @Input() selectData: Array<[]>;
  @Input() parentCategory: boolean;
  @Input() leafCategory: boolean;
  @Input() allCategory: boolean;
  @Input() resetSelection: boolean;
  @Input() label: string;
  @Input() selectedOption: Array<any> = [];
  @Input() disabled: boolean;
  @Input() requestedIdData: Array<any> = [];
  @Output() getSelectedValue = new EventEmitter();
  @Output() getRequestedIdValue = new EventEmitter();
  prevData = [];
  prevSelection = [];
  storeSubscription: Subscription;
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
  checklistSelection = new SelectionModel<TodoItemFlatNode>(false);

  ngOnChanges() {

    treeData = this.selectData;
    this.initialize();
    console.log('RESET_SELECTION', this.resetSelection, this.checklistSelection);
    if (this.resetSelection) {
      this.checklistSelection.clear();
    }
  }
  ngOnDestroy() {
    this.prevData = [];
    this.prevSelection = [];
  }
  constructor(private store: Store<any>) {
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
      console.log(this.checklistSelection.selected);
      this.getSelectedValue.emit(this.checklistSelection.selected);
    });
    // Subscription On Flat Tree Data For Selection of selected ids.
    this.dataSource._flattenedData.subscribe(res => {
      console.log('COMPONENT_SELECTED', this.selectedOption);
      if (this.selectedOption.length > 0) {
        const currentData = res;
        const currentSelection = this.selectedOption;
        // if (this.prevData.length !== currentData.length || this.prevSelection.length !== currentSelection.length) {
        this.prevData = currentData;
        this.prevSelection = currentSelection;
        let requestedNodes = [];
        let haveRequestedData = false;
        this.selectedOption.forEach(id => {
          console.log('IDS', id);
          requestedNodes = [];
          res.forEach(node => {
            console.log('REUQESTED ID DATA:::::::::', this.requestedIdData);
            if (this.requestedIdData.length > 0) {
              haveRequestedData = true;
              const requestedId = this.requestedIdData.find(reqId => reqId != id ? node.item.id == reqId : false);
              if (requestedId) {

                requestedNodes.push(node.item);
              }
            }
            const foundNode = node.item.id == id;
            if (foundNode) {
              this.checklistSelection.select(node);
            }
            // console.log(node.item.id === id);
            // return node.item.id === id;
          });
          // console.log('Foudn', foundNode);
          // if (foundNode) {
          //   this.checklistSelection.select(foundNode);
          //   console.log('CHECKLISTSELECTION', this.checklistSelection.isSelected(foundNode));
          // }
        });
        if (haveRequestedData) {
          console.log('Node::::::', requestedNodes);
          this.getRequestedIdValue.emit(requestedNodes);
        }
        // }
      }
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
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  }


  searchCategory(event) {
    console.log(event.target.value, typeof event.target.value);
    const inputValue = event.target.value.toString().trim();
    if (inputValue.length > 3) {
      this.store.dispatch(new GetProductCategoryParentSearch({ name: inputValue }));
    } else {
      this.store.dispatch(new GetParentCategory());
    }
    // const value = event.target.value.toString().toLowerCase();
    // const filterData = this.dataSource._flattenedData.value.filter(node => { console.log(node.item.name); return node.item.name.toLowerCase().includes(value) });
    // this.buildFilterData(filterData, 0)
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
      if (v.childList) {
        if (v.childList.length === 0 || v.childList === undefined) {
          // no action
        } else if (v.childList.length > 0) {
          node.children = this.buildFileTree(v.childList, level + 1);
        } else {
          node.item = v;
        }
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
