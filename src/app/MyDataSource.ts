import { ArrayDataSource, CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, Subscription, of } from 'rxjs';
import { ExampleFlatNode } from './app.component';
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

export class ArrayDataSource1 extends DataSource<ExampleFlatNode>  {
    // public get data(): ExampleFlatNode[] {
    //     return this._data.filter(a=>a.Level == 0 || a.isExpanded);
    // }
    // public set data(value: ExampleFlatNode[] | ReadonlyArray<ExampleFlatNode> | Observable<ExampleFlatNode[] | ReadonlyArray<ExampleFlatNode>>) {
    //     this._data = value;
    // }

    constructor(private _data: ExampleFlatNode[]) {
      super();
    }
  
    connect(): Observable<ExampleFlatNode[] | ReadonlyArray<ExampleFlatNode>> {
     const data = this._data.filter(a=>a.Level == 0 || a.isExpanded);
      return data instanceof Observable ? data : of(data);
    }
  
    disconnect() {}
  }
