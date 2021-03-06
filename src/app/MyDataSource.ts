import {
  ArrayDataSource,
  CollectionViewer,
  DataSource
} from "@angular/cdk/collections";
import { BehaviorSubject, Observable, Subscription, of } from "rxjs";
import { ExampleFlatNode } from "./app.component";
// export class MyDataSource extends ArrayDataSource<ExampleFlatNode> {
//   private _length = 100000;
//   private _pageSize = 100;
//   private _cachedData = Array.from<ExampleFlatNode>({ length: this._length });
//   private _fetchedPages = new Set<number>();
//   private _dataStream = new BehaviorSubject<(ExampleFlatNode)[]>(super._data);
//   private _subscription = new Subscription();
//   connect(): Observable<ExampleFlatNode[] | readonly ExampleFlatNode[]> {
//     return this._dataStream;
//   }
//   disconnect(): void {
//     this._subscription.unsubscribe();
//   }
//   private _getPageForIndex(index: number): number {
//     return Math.floor(index / this._pageSize);
//   }
//   private _fetchPage(page: number) {
//     if (this._fetchedPages.has(page)) {
//       return;
//     }
//     // this._fetchedPages.add(page);
//     // // Use `setTimeout` to simulate fetching data from server.
//     // setTimeout(() => {
//     //   this._cachedData.splice(page * this._pageSize, this._pageSize,
//     //       ...Array.from({length: this._pageSize})
//     //           .map((_, i) => `Item #${page * this._pageSize + i}`));
//     //   this._dataStream.next(this._cachedData);
//     // }, Math.random() * 1000 + 200);
//   }
// }

export class ArrayDataSource1 extends DataSource<ExampleFlatNode> {
  // public get data(): ExampleFlatNode[] {
  //     return this._data.filter(a=>a.Level == 0 || a.isExpanded);
  // }
  // public set data(value: ExampleFlatNode[] | ReadonlyArray<ExampleFlatNode> | Observable<ExampleFlatNode[] | ReadonlyArray<ExampleFlatNode>>) {
  //     this._data = value;
  // }

  dataChange = new BehaviorSubject<ExampleFlatNode[]>([]);

  get data(): ExampleFlatNode[] {
    return this.dataChange.value;
  }
  set data(value: ExampleFlatNode[]) {
    this.dataChange.next(value);
  }

  constructor(private _data: ExampleFlatNode[]) {
    super();
    this.publishData();
  }

  connect(): Observable<ExampleFlatNode[] | ReadonlyArray<ExampleFlatNode>> {
    const data = this.publishData();

    return data instanceof Observable ? data : of(data);
  }

  disconnect() {}

  //     getChildren(node: ExampleFlatNode): ExampleFlatNode[] | undefined {
  //         const itemIndex = this._data.indexOf(node);

  //         let count = 0;
  //       for (
  //         let i = itemIndex + 1;
  //         i < this._data.length && this._data[i].Level > node.Level;
  //         i++, count++
  //       ) {}
  //       const returnItems: ExampleFlatNode[] =[];
  // for(let i=0;i<= this._data.length; i++) {
  //     const item = this._data[i];
  //     if() {
  //         returnItems.push(item);
  //     }
  // }
  //         return this._data.filter((data, index, array)=>data.Level == node.Level + 1 && index >= itemIndex + 1 && index <= count )
  //      }

  toggleNode(node: ExampleFlatNode, expand: boolean) {
    //     const children = this.getChildren(node.item);
    // const index = this._data.indexOf(node);
    // if (!children && expand) {
    //   // If no children, or cannot find the node, no op
    //   //this.makeGetTreeCall(node, index);

    //   return;
    // }
    node.isExpanded = !node.isExpanded;
    const itemIndex = this._data.indexOf(node);

    for (let i = itemIndex + 1; i < this._data.length; i++) {
      const item = this._data[i];
      if (item.Level == node.Level) {
        break;
      }
      if (item.Level >= node.Level + 1) {
        item.shouldRender = expand;
      }
    }

    //setTimeout(() => {
    if (expand) {
    } else {
    }

    this.publishData();
  }

  private publishData() {
    const data = this._data.filter(
      a => a.Level == 0 || a.isExpanded || a.shouldRender
    );
    this.publish(data);
    return data;
  }

  private publish(data: ExampleFlatNode[]) {
    this.dataChange.next(data);
  }
}
