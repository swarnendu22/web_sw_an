import * as ImgAwsActions from './../actions/img-upload-aws.action';

export interface ComponentState {
  awsImgUpload: object;
}
export const initialComponentState: ComponentState = {
  awsImgUpload: null,

}
export function componentsReducer(state = initialComponentState, action: ImgAwsActions.ImgUploadAwsActions): ComponentState {
  switch (action.type) {
    case ImgAwsActions.ActionTypes.storeImgUploadAwsResponse: {

      // state.awsImgUpload.push(action.payload);
      return {
        ...state,
        awsImgUpload: action.payload
      };
    }
    default: {
      return state;
    }
  }
}