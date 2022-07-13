import { Injectable } from "@angular/core";


@Injectable()
export class ServerSidePagination {
  constructor() {
    console.log('HHHHH');
    // this.FakeServer(allData, cacheBlockSize, self, actionName);
  }

  ServerSideDatasource(server) {
    console.log('Data');
    return {
      getRows(params) {
        setTimeout(() => {
          let response = server.getResponse(params.request);
          if (response.success) {
            params.successCallback(response.rows, response.lastRow);
          } else {
            params.failCallback();
          }
        }, 500);
      },
    };
  }

  FakeServer(allData, cacheBlockSize, self, actionName) {
    console.log('Fake', allData);
    return {
      getResponse(request) {
        console.log(
          'asking for rows: ' + request.startRow + ' to ' + request.endRow
        );
        let rowsThisPage;
        self.pageNo = parseInt(request.endRow, 10) / cacheBlockSize;
        console.log('PAGE_NO', this.pageNo);
        if (self.pageNo !== 1) {
          console.log('THIS', this, self);
          self.getData(actionName, self.pageNo);
        }
        console.log('START,END', request.startRow, request.endRow);
        rowsThisPage = allData.slice(request.startRow, request.endRow);
        let lastRow = allData.length <= request.endRow ? allData.length : -1;
        return {
          success: true,
          rows: rowsThisPage,
          lastRow: lastRow,
        };
      },
    };
  }

  getData(actionName, pageNo) {
    // this.store.dispatch(new actionName({ pageNo }));
  }
}
