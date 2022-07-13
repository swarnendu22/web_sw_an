import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { AwsService } from './../../utils/aws-service/aws-service.service';

import * as imgUploadActions from 'src/app/actions/img-upload-aws.action';
import { EMPTY } from 'rxjs';

@Injectable()
export class ImgUploadAwsEffect {

  @Effect({ dispatch: false })

  imUploadEffect$ = this.actions.pipe(
    ofType<imgUploadActions.UploadImageToAws>(imgUploadActions.ActionTypes.uploadImageToAws),
    mergeMap((action) =>
      [this.awsService.uploadFile(action.payload)]
    )
  );
  constructor(
    private actions: Actions,
    private awsService: AwsService
  ) {

  }
}