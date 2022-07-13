import { Action } from '@ngrx/store'

export enum ActionTypes {
  uploadImageToAws = '[IMG UPLOAD] TO AWS',
  storeImgUploadAwsResponse = '[IMG UPLOAD] STORE RESPONSE TO AWS'
}
export class UploadImageToAws implements Action {
  readonly type = ActionTypes.uploadImageToAws;
  constructor(public payload: any) { }
}
export class StoreImgUploadToAws implements Action {
  readonly type = ActionTypes.storeImgUploadAwsResponse;
  constructor(public payload: any) { }
}
export type ImgUploadAwsActions = StoreImgUploadToAws