// export class MyDataSource extends ArrayDataSource<ExampleFlatNode> {
//   private _length = 100000;
//   private _pageSize = 100;
//   private _cachedData = Array.from<ExampleFlatNode>({ length: this._length });
//   private _fetchedPages = new Set<number>();
//   private _dataStream = new BehaviorSubject<(ExampleFlatNode)[]>(this._cachedData);
//   private _subscription = new Subscription();
//   connect(collectionViewer: CollectionViewer): Observable<ExampleFlatNode[] | readonly ExampleFlatNode[]> {
//     this._subscription.add(collectionViewer.viewChange.subscribe(range => {
//       const startPage = this._getPageForIndex(range.start);
//       const endPage = this._getPageForIndex(range.end - 1);
//       for (let i = startPage; i <= endPage; i++) {
//         this._fetchPage(i);
//       }
//     }));
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
