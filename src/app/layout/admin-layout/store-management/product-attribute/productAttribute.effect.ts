import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, switchMap, catchError, concat } from 'rxjs/operators';
import { RequestService } from '../../../../utils/request/request.service';
import * as categoryActions from '../../../../actions/storeManagement.action';
import { ApiMessageService } from '../../../../utils/api/api-message.service';
import { Router } from '@angular/router';
import { GetAttributePositions } from '../../../../actions/storeManagement.action';

@Injectable()
export class productAttributeEffects {
  @Effect()
  getProductAttribute$ = this.actions$.pipe(
    ofType<categoryActions.GetProductAttribute>(
      categoryActions.ActionTypes.getProductAttributes
    ),
    switchMap(() =>
      // console.log('ACTIONS', action)
      // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes?pageNumber=1&pageSize=100000`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StoreProductAttribute(response['payload'])
          )
        )
    )
  );
  @Effect({ dispatch: false })
  postProductAttribute$ = this.actions$.pipe(
    ofType<categoryActions.PostProductAttribute>(
      categoryActions.ActionTypes.postProductAttributes
    ),
    switchMap(action =>
      // console.log('ACTIONS', action)
      // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
      this.requestService
        .request(
          {
            url: '/api/ndh-product/attribute/admin-api/attributes',
            method: 'post',
            payload: action['payload'],
          },
          true
        )
        .pipe(
          map(response => this._router.navigate(['store/product-attribute']))
        )
    )
  );
  @Effect({ dispatch: false })
  updateProductAttribute$ = this.actions$.pipe(
    ofType<categoryActions.UpdateProductAttribute>(
      categoryActions.ActionTypes.updateProductAttributes
    ),
    switchMap(action =>
      // console.log('ACTIONS', action)
      // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes-update/${action['id']}`,
            method: 'put',
            payload: action['payload'],
          },
          true
        )
        .pipe(
          map(response => {
            console.log('Update Product Attribute');
            this._router.navigate(['store/product-attribute']);
          })
        )
    )
  );

  @Effect()
  updateProductAttributeOnPosition$ = this.actions$.pipe(
    ofType<categoryActions.UpdateAttributePositions>(
      categoryActions.ActionTypes.updateAttributePositions
    ),
    switchMap(action =>
      // console.log('ACTIONS', action)
      // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attributes-set-rel/position`,
            method: 'put',
            payload: action['payload'],
          },
          true,
          false
        )
        .pipe(
          map(response => {
            return new categoryActions.GetAttributeSetAttributes(action['id']);
          })
        )
    )
  );

  @Effect()
  deleteAttributesOnAttributeSet$ = this.actions$.pipe(
    ofType<categoryActions.DeleteAttributesOnAttributeSet>(
      categoryActions.ActionTypes.deleteAttributesOnAttributeSet
    ),
    switchMap(action =>
      // console.log('ACTIONS', action)
      // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attribute-set/delete/${action['id']}/position/${action['position']}`,
            method: 'delete',
          },
          true
        )
        .pipe(
          switchMap(res => {
            return [
              new categoryActions.GetAttributesByGroupId(
                action['groupId'],
                action['parentId']
              ),
              new categoryActions.GetAttributeSetAttributes(action['parentId']),
            ];
          })
        )
    )
  );

  // @Effect()
  // getAttributePositions$ = this.actions$.pipe(
  //   ofType<categoryActions.GetAttributePositions>(
  //     categoryActions.ActionTypes.getAttributePositions
  //   ),
  //   switchMap(action =>
  //     this.requestService
  //       .request(
  //         {
  //           url: `/api/ndh-product/attribute/admin-api/attributes/values/active/${
  //             action['id']
  //           }`,
  //           method: 'get',
  //         },
  //         true
  //       )
  //       .pipe(
  //         map(
  //           response =>
  //             new categoryActions.StoreAttributePositions(response['payload'])
  //         )
  //       )
  //   )
  // );

  @Effect({ dispatch: false })
  deleteProductAttribute$ = this.actions$.pipe(
    ofType<categoryActions.DeleteProductAttributes>(
      categoryActions.ActionTypes.deleteProductAttributes
    ),
    switchMap(action =>
      // console.log('ACTIONS', action)
      // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attribute-value/delete/${action['id']}`,
            method: 'delete',
          },
          true
        )
        .pipe(
          map(response => {
            console.log('Delete Attribute Product', response);
          })
        )
    )
  );

  @Effect()
  getByIdProductAttribute$ = this.actions$.pipe(
    ofType<categoryActions.GetByIdProductAttribute>(
      categoryActions.ActionTypes.getByIdProductAttributes
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/${action['id']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StoreGetByIdProductAttribute(
                response['payload']
              )
          )
        )
    )
  );

  @Effect()
  getByIdProductAttributeValues$ = this.actions$.pipe(
    ofType<categoryActions.GetByIdProductAttributeValue>(
      categoryActions.ActionTypes.getByIdProductAttributesValue
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/${action['id']}/values/all`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StoreGetByIdProductAttributeValue(
                response['payload']
              )
          )
        )
    )
  );

  @Effect()
  viewProductAttributeValues$ = this.actions$.pipe(
    ofType<categoryActions.ViewProductAttributeValue>(
      categoryActions.ActionTypes.viewProductAttributeValue
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/${action['id']}/values/all`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StoreViewProductAttribute(response['payload'])
          )
        )
    )
  );

  @Effect({ dispatch: false })
  postAttributeGroup$ = this.actions$.pipe(
    ofType<categoryActions.PostAttributeGroup>(
      categoryActions.ActionTypes.postAttributeGroup
    ),
    switchMap(action =>
      // console.log('ACTIONS', action)
      // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
      this.requestService
        .request(
          {
            url: '/api/ndh-product/attribute/admin-api/attributes/attribute-group',
            method: 'post',
            payload: action['payload'],
          },
          true
        )
        .pipe(
          map(response =>
            this._router.navigate(['store/product-attribute/attribute-group'])
          )
        )
    )
  );

  @Effect()
  getByIdAttributeByGroup$ = this.actions$.pipe(
    ofType<categoryActions.GetByIdAttributeGroup>(
      categoryActions.ActionTypes.getByIdAttributeGroupName
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/group/${action['groupId']}/attributeSet/${action['setId']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StoreGetByIdAttributeGroupName(
                response['payload']
              )
          )
        )
    )
  );

  @Effect()
  getAttributesByGroupId$ = this.actions$.pipe(
    ofType<categoryActions.GetAttributesByGroupId>(
      categoryActions.ActionTypes.getAttributesByGroupId
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/group/${action['groupId']}/attributeSet/${action['setId']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StoreAttributesByGroupId(response['payload'])
          )
        )
    )
  );

  @Effect()
  getByIdGroupName$ = this.actions$.pipe(
    ofType<categoryActions.GetByIdAttributeGroupNew>(
      categoryActions.ActionTypes.getByIdAttributeGroupNameNew
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attribute-group/${action['id']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StoreAttributeGroupNameById(
                response['payload']
              )
          )
        )
    )
  );

  @Effect()
  getAttributeGroupName$ = this.actions$.pipe(
    ofType<categoryActions.GetAttributeGroupName>(
      categoryActions.ActionTypes.getAttributeGroupName
    ),
    switchMap(() =>
      this.requestService
        .request(
          {
            url:
              '/api/ndh-product/attribute/admin-api/attributes/attribute-group-sort?pageNumber=1&pageSize=100000',
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StoreAttributeGroupName(response['payload'])
          )
        )
    )
  );

  @Effect({ dispatch: false })
  checkAttributeGroupName$ = this.actions$.pipe(
    ofType<categoryActions.CheckAttributeGroupName>(
      categoryActions.ActionTypes.checkAttributeGroupName
    ),
    switchMap(action =>
      // console.log('ACTIONS', action)
      // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attribute-group/group/${action['keyword']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(response => {
            return this.apiMessageService.changeApiStatus({
              type: categoryActions.ActionTypes.checkAttributeGroupName,
              status: true,
              payload: { value: response },
            });
          })
        )
    )
  );

  @Effect()
  getByIdAttributeSet$ = this.actions$.pipe(
    ofType<categoryActions.GetByIdAttributeSet>(
      categoryActions.ActionTypes.getByIdAttributeSet
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attribute-set/${action['id']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(response => {
            this.apiMessageService.changeApiStatus({
              type: categoryActions.ActionTypes.getAttributeSetAttributes,
              status: true,
            });
            return new categoryActions.StoreAttributeSetById(
              response['payload']
            );
          })
        )
    )
  );

  @Effect({ dispatch: false })
  updateAttributeGroup$ = this.actions$.pipe(
    ofType<categoryActions.PutAttributeGroup>(
      categoryActions.ActionTypes.putAttributeGroupName
    ),
    switchMap(action =>
      // console.log('ACTIONS', action)
      // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attribute-group`,
            method: 'put',
            payload: action['payload'],
          },
          true
        )
        .pipe(
          map(response => {
            console.log('Updated groupname', response);
            this._router.navigate(['store/product-attribute/attribute-group']);
            // this.apiMessageService.changeApiStatus({
            //   type: categoryActions.ActionTypes.putAttributeGroupName,
            //   status: true,
            // });
          })
        )
    )
  );
  @Effect({ dispatch: false })
  deleteAttributeGroupName$ = this.actions$.pipe(
    ofType<categoryActions.DeleteAttributeGroupName>(
      categoryActions.ActionTypes.deleteAttributeGroupName
    ),
    switchMap(action =>
      // console.log('ACTIONS', action)
      // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attribute-group/delete/${action['id']}`,
            method: 'delete',
          },
          true
        )
        .pipe(
          map(response => {
            console.log('Delete Attribute Set', response);
          })
        )
    )
  );

  @Effect()
  getAttributeSet$ = this.actions$.pipe(
    ofType<categoryActions.GetAttributeSet>(
      categoryActions.ActionTypes.getAttributeSet
    ),
    switchMap(() =>
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attribute-set?pageNumber=1&pageSize=100000`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StoreAttributeSet(response['payload'])
          )
        )
    )
  );

  @Effect()
  getAttributeSetPagination$ = this.actions$.pipe(
    ofType<categoryActions.GetAttributeSetPagination>(
      categoryActions.ActionTypes.getAttributeSetPagination
    ),
    switchMap(({ payload }) =>
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attribute-set?pageSize=101&pageNumber=${payload.pageNo}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(
            response =>
              new categoryActions.StoreAttributeSet(response['payload'])
          )
        )
    )
  );

  @Effect()
  postAttributeSet$ = this.actions$.pipe(
    ofType<categoryActions.PostAttributeSet>(
      categoryActions.ActionTypes.postAttributeSet
    ),
    switchMap(action =>
      // console.log('ACTIONS', action)
      // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
      this.requestService
        .request(
          {
            url: '/api/ndh-product/attribute/admin-api/attributes/attribute-set',
            method: 'post',
            payload: action['payload'],
          },
          true
        )
        .pipe(
          map(response => {
            return new categoryActions.GetNewAttributeSetById(
              action['payload']['name']
            );
          })
        )
    )
  );

  @Effect({ dispatch: false })
  getNewAttributeSetById$ = this.actions$.pipe(
    ofType<categoryActions.GetNewAttributeSetById>(
      categoryActions.ActionTypes.getNewAttributeSetId
    ),
    switchMap(action =>
      // console.log('ACTIONS', action)
      // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attribute-setname/${action['keyword']}`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(response => {
            this.apiMessageService.changeApiStatus({
              type: 'GET_NEW_ATTRIBUTE_SET_BY_ID',
              status: true,
              payload: response,
            });
          })
        )
    )
  );

  @Effect({ dispatch: false })
  updateAttributeSet$ = this.actions$.pipe(
    ofType<categoryActions.UpdateAttributeSet>(
      categoryActions.ActionTypes.updateAttributeSet
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attribute-set/${action['id']}`,
            method: 'post',
            payload: action['payload'],
          },
          true
        )
        .pipe(
          map(response => {
            console.log('Updated groupname', response);
            // this.apiMessageService.changeApiStatus({
            //   type: categoryActions.ActionTypes.putAttributeGroupName,
            //   status: true,
            // });
          })
        )
    )
  );

  @Effect()
  deleteAttributeSet$ = this.actions$.pipe(
    ofType<categoryActions.DeleteAttributeSet>(
      categoryActions.ActionTypes.deleteAttributeSet
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attribute-set/delete/${action['id']}`,
            method: 'delete',
          },
          true
        )
        .pipe(
          map(response => {
            console.log('Delete Attribute Set', response);
            return new categoryActions.GetAttributeSetAttributes(
              action['parentID']
            );
          })
        )
    )
  );
  @Effect()
  postAttributeSetRel$ = this.actions$.pipe(
    ofType<categoryActions.PostAttributeSetRel>(
      categoryActions.ActionTypes.postAttributeSetRel
    ),
    switchMap(action =>
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attribute-set/${action['id']}/attributes/${action['attribute_id']}`,
            method: 'post',
            payload: {},
          },
          true
        )
        .pipe(
          switchMap(res => {
            return [
              new categoryActions.GetAttributeSetAttributes(action['id']),
              new categoryActions.GetAttributesByGroupId(
                action['groupId'],
                action['id']
              ),
            ];
          })
        )
    )
  );
  @Effect()
  getAttributeSetAttributes$ = this.actions$.pipe(
    ofType<categoryActions.GetAttributeSetAttributes>(
      categoryActions.ActionTypes.getAttributeSetAttributes
    ),
    switchMap(({ id }) =>
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attribute-set/${id}/attributes/sort?pageNumber=1&pageSize=100000`,
            method: 'get',
          },
          true
        )
        .pipe(
          map(response => {
            this.apiMessageService.changeApiStatus({
              type: 'GET_ATTRIBUTES_ON_ATTRIBUTESET_LOADING',
              status: true,
            });
            return new categoryActions.StoreAttributeSetAttributes(
              response['payload']
            );
          })
        )
    )
  );

  @Effect()
  updateAttributeSetRel$ = this.actions$.pipe(
    ofType<categoryActions.UpdateAttributeSetRel>(
      categoryActions.ActionTypes.updateAttributeSetRel
    ),
    switchMap(action =>
      // console.log('ACTIONS', action)
      // const options = { url: 'api/v1/page_template_and_widgets/android-3?page=home', method: 'get' };
      this.requestService
        .request(
          {
            url: `/api/ndh-product/attribute/admin-api/attributes/attribute-set-rel/${action['id']}`,
            method: 'post',
            payload: action['payload'],
          },
          true
        )
        .pipe(
          map(response => {
            console.log('Update Set Rel', response);
            return new categoryActions.GetAttributeSetAttributes(
              action['setId']
            );
          })
        )
    )
  );
  constructor(
    private actions$: Actions,
    private requestService: RequestService,
    private apiMessageService: ApiMessageService,
    private _router: Router
  ) { }
}
