import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '../../../../node_modules/@angular/common/http';
import { environment } from 'src/environments/environment';
import axios from 'axios';


export interface ApiStatusType {
  type: any;
  status: boolean;
  payload?: object;
}
const initialApiStatusType: ApiStatusType = {
  type: '',
  status: false,
  payload: {},
};

@Injectable({
  providedIn: 'root',
})
export class ApiMessageService {
  searchKeys = {
    search: '',
    url: ''
  }
  search = new BehaviorSubject(this.searchKeys);
  private apiStatus = new BehaviorSubject(initialApiStatusType);
  currentApiStatus = this.apiStatus.asObservable();
  constructor(private _http: HttpClient) { }
  changeApiStatus(payload: ApiStatusType) {
    this.apiStatus.next(payload);
  }

  public getFilter() {
    return this.search.asObservable();
  }

  public setFilter(search): void {

    this.search.next(search);
  }

  downloadFile(url, content_type, storeId = '') {
    if (storeId != '') {
      return this._http.get(`${environment.base_url}/${url}`, {
        responseType: 'blob',
        headers: new HttpHeaders(
          {
            'Accept': 'application/json',
            'Content-Type': content_type,
            'Client-Token': environment.client_token,
            'X-Auth-Token': localStorage.getItem('ndh-admin-auth-token'),
            'storeId': storeId


          })
      });
    }
    else {
      return this._http.get(`${environment.base_url}/${url}`, {
        responseType: 'blob',
        headers: new HttpHeaders(
          {
            'Accept': 'application/json',
            'Content-Type': content_type,
            'Client-Token': environment.client_token,
            'X-Auth-Token': localStorage.getItem('ndh-admin-auth-token'),
            // 'storeId': storeId


          })
      });
    }
  }




  checkAvailability(payload) {

    return this._http.post(`${environment.base_url}/api/sellers/admin-api/merchant/isEmailExists`, payload, {
      headers: new HttpHeaders(
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Client-Token': environment.client_token,
          'X-Auth-Token': localStorage.getItem('ndh-admin-auth-token'),

        })
    });
  }

  reIndex(payload) {
    return this._http.post(`${environment.reIndexurl}`, payload, {
      headers: new HttpHeaders(
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Client-Token': 'd7c10a60iU5a04c2ed3de60iU5a0292a26f94d1c544',

        })
    });

  }
  scheduleFlashSale(payload) {
    return this._http.post(`${environment.flash_sales}`, { id: payload.id }, {
      headers: new HttpHeaders(
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Client-Token': '89864de5ba012f8238cc96144767f11c1fddb85c281d2dd3ed69c3192bf50c',

        })
    });

  }
  uploadFile(payload) {
    let formdata = new FormData()

    formdata.append('key', payload.key)
    formdata.append('fileObj', payload.fileObj)
    console.log(formdata)
    let headers = {
      'Accept': "application/json",
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryPcZZOBNWiEcCVG6w',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      "internet":"a3f4cd7008eb5105f106c5bf4693e252b8733001550474b29990ff7a205dbb94"
    };

    //http://localhost:5001
    //${environment.nodeBaseURL}
    return axios
      .post(`${environment.nodeBaseURL}/intercept/upload`, formdata, {
        headers,
      })
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((error) => {
        console.log('error_request_desktop', error);

      });
  }
}
