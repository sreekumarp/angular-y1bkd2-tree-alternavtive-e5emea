import { Component, Injectable, ChangeDetectionStrategy } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ArrayDataSource } from "@angular/cdk/collections";
import {DataSource} from '@angular/cdk/collections';
import { ArrayDataSource1 } from './MyDataSource';
import { TREE_DATA } from './TREE_DATA';


// Interface used for representing a node of data
export interface FakeNode {
  ObjectName: string;
  children: FakeNode[];
}

const MAX_LEVELS = 3;
const MAX_NODES_PER_LEVEL = 5; 

export interface ExampleFlatNode {
  expandable: boolean;
  ObjectName: string;
  Level: number;
  isExpanded?: boolean;
}

// Generates fake data
@Injectable()
export class RandomDataProvider {
  data: FakeNode[] = [];

  constructor() {
    for(let i = 0; i < MAX_NODES_PER_LEVEL; i++) {
      this.data.push(generateNode(0, i));
    }
  }
}

// Function for generating a fake data node
function generateNode(Level: number, index: number): FakeNode {
  let children: FakeNode[] = [];
  if (Level < MAX_LEVELS) {
    for (let i = 0; i < Math.round(Math.random() * MAX_NODES_PER_LEVEL); i++) {
      children.push(generateNode(Level + 1, i));
    }
  }

  return {
    ObjectName: 'Level ' + Level + ' index ' + index,
    children,
  };
}

// Interface used for representing a node of data within the flat tree component
export interface FakeFlatNode {
  ObjectName: string;
  Level: number;
  hasChildren: boolean;
}

// Component containing virtual scrolling flat tree 
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  providers: [RandomDataProvider],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent  {

  treeControl1 = new FlatTreeControl<ExampleFlatNode>(
    node => node.Level,
    node => node.expandable
  );

  arrayDataSource = new ArrayDataSource1(TREE_DATA);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  // Provided generated data
  readonly providedData = this.dataProvider.data;
  // Tree control to feed to the cdk tree 
  readonly treeControl: FlatTreeControl<FakeFlatNode> = 
    new FlatTreeControl<FakeFlatNode>(getNodeLevel, getIsNodeExpandable);
  // Data source fed into the cdk tree control 
  readonly dataSource: MatTreeFlatDataSource<FakeNode, FakeFlatNode>;

  constructor(readonly dataProvider: RandomDataProvider) {
    // Tells tree data source builder how to flatten our nested node data into flat nodes
    const treeFlattener = 
      new MatTreeFlattener<FakeNode, FakeFlatNode>(
        nodeTransformer, 
        getNodeLevel, 
        getIsNodeExpandable, 
        getNodeChildren,
      );
    // Populates our flattened data into the tree control
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, treeFlattener);
    this.dataSource.data = this.providedData;
    console.log(this.dataSource.data);
  }

  // Number of dom nodes rendered in the virtually scrolling tree
  get numTreeNodes() {
    return document.querySelectorAll('.node').length;
  }

  // Number of dom nodes rendered in the non-virtually scrolling cdk-tree
  get numCdkTreeNodes() {
    return document.querySelectorAll('cdk-tree-node').length;
  }

  hasChild1(index: number, nodeData: FakeFlatNode) {
    return getIsNodeExpandable(nodeData);
  }

  getParentNode(node: ExampleFlatNode) {
    const nodeIndex = TREE_DATA.indexOf(node);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (TREE_DATA[i].Level === node.Level - 1) {
        return TREE_DATA[i];
      }
    }

    return null;
  }

  shouldRender(node: ExampleFlatNode) {
    const parent = this.getParentNode(node);
    return !parent || parent.isExpanded;
  }

  isExpandable(node: ExampleFlatNode): boolean {
    const nodeIndex = TREE_DATA.indexOf(node);
    if (TREE_DATA.length > nodeIndex) {
      const belowItem = TREE_DATA[nodeIndex + 1];
      return belowItem.Level == node.Level + 1;
    }
    return false
  }
}

// Function that maps a nested node to a flat node
function nodeTransformer(node: FakeNode, Level: number) {
  return {
    ObjectName: node.ObjectName,
    Level,
    hasChildren: node.children.length > 0,
  };
}

// Function that gets a flat node's Level
function getNodeLevel({Level}: FakeFlatNode) {
  return Level;
}

// Function that determines whether a flat node is expandable or not
function getIsNodeExpandable({hasChildren}: FakeFlatNode) {
  return hasChildren;
}

// Function that returns a nested node's list of children 
function getNodeChildren({children}: FakeNode) {
  return children;
}