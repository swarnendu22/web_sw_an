import { Action } from '@ngrx/store';

export enum ActionTypes {
  getAffiliateGroups = 'getAffiliateGroups',
  storeAffiliateGroups = 'storeAffiliateGroups',
  getDistributors = 'getDistributors',
  storeDistributors = 'storeDistributors',
  postAffiliateGroup = 'postAffiliateGroup',

  getAffiliateGroupDetail = 'getAffiliateGroup',
  storeAffiliateGroupDetail = 'storeAffiliateGroup',

  getDistributorDetail = 'getDistributorDetail',
  storeDistributorDetail = 'storeDistributorDetail',

  getAffiliationRequest = 'getAffiliationRequest',
  storeAffiliationRequest = 'storeAffiliationRequest',

  getActiveAffiliate = 'getActiveAffiliate',
  storeActiveAffiliate = 'storeActiveAffiliate',

  postDistributor = 'postDistributor',
  postAffiliate = 'postAffiliate',

  getActiveAffiliateById = 'getActiveAffiliateById',
  storeActiveAffiliateById = 'storeActiveAffiliateById',


  getUserList = 'getUserList',
  storeUserList = 'storeUserList',
  convertUserToAgent = 'convertUserToAgent',
  removeUserFromList = 'removeUserFromList',
  getAgentBalance = 'getAgentBalance',
  storeAgentBalance = 'storeAgentBalance',
  setAgentLimit = 'setAgentLimit',
}
export class GetAffiliateGroups implements Action {
  readonly type = ActionTypes.getAffiliateGroups;
}
export class StoreAffiliateGroups implements Action {
  readonly type = ActionTypes.storeAffiliateGroups;
  constructor(public payload: object) { }
}
export class GetDistributors implements Action {
  readonly type = ActionTypes.getDistributors;
}
export class StoreDistributors implements Action {
  readonly type = ActionTypes.storeDistributors;
  constructor(public payload: object) { }
}

export class PostAffiliateGroup implements Action {
  readonly type = ActionTypes.postAffiliateGroup;
  constructor(public payload: any) { }
}

export class GetAffiliateGroupDetail implements Action {
  readonly type = ActionTypes.getAffiliateGroupDetail;
  constructor(public payload: object) { }
}
export class StoreAffiliateGroupDetail implements Action {
  readonly type = ActionTypes.storeAffiliateGroupDetail;
  constructor(public payload: object) { }
}

export class GetActiveAffiliate implements Action {
  readonly type = ActionTypes.getActiveAffiliate;
  constructor(public status: any, public pageNo: number) { }
}

export class StoreActiveAffiliate implements Action {
  readonly type = ActionTypes.storeActiveAffiliate;
  constructor(public payload: object) { }
}

export class GetDistributorDetail implements Action {
  readonly type = ActionTypes.getDistributorDetail;
  constructor(public payload: object) { }
}

export class StoreDistributorDetail implements Action {
  readonly type = ActionTypes.storeDistributorDetail;
  constructor(public payload: object) { }
}

export class PostDistributor implements Action {
  readonly type = ActionTypes.postDistributor;
  constructor(public payload: object) { }
}
export class PostAffiliate implements Action {
  readonly type = ActionTypes.postAffiliate;
  constructor(public payload: object) { }
}

export class GetActiveAffiliateById implements Action {
  readonly type = ActionTypes.getActiveAffiliateById;
  constructor(public id: any) { }
}

export class StoreActiveAffiliateById implements Action {
  readonly type = ActionTypes.storeActiveAffiliateById;
  constructor(public payload: object) { }
}

export class GetAffiliationRequest implements Action {
  readonly type = ActionTypes.getAffiliationRequest;
  constructor(public payload: object) { }
}
export class StoreAffiliationRequest implements Action {
  readonly type = ActionTypes.storeAffiliationRequest;
  constructor(public payload: object) { }
}

export class GetUserList implements Action {
  readonly type = ActionTypes.getUserList;

}
export class StoreUserList implements Action {
  readonly type = ActionTypes.storeUserList;
  constructor(public payload: object) { }
}

export class ConvertUserToAgent implements Action {
  readonly type = ActionTypes.convertUserToAgent;
  constructor(public id: object) { }
}

export class RemoveUserFromList implements Action {
  readonly type = ActionTypes.removeUserFromList;
  constructor(public payload: any) { }
}

export class GetAgentBalance implements Action {
  readonly type = ActionTypes.getAgentBalance;
  constructor(public id: object) { }
}

export class StoreAgentBalance implements Action {
  readonly type = ActionTypes.storeAgentBalance;
  constructor(public payload: any) { }
}

export class SetAgentLimit implements Action {
  readonly type = ActionTypes.setAgentLimit;
  constructor(public id: object, public payload: any) { }
}

export type manegeAffiliateGroupActions =
  | StoreAffiliateGroups
  | StoreDistributors
  | PostAffiliateGroup
  | StoreAffiliateGroupDetail
  | StoreDistributorDetail
  | StoreActiveAffiliate
  | PostDistributor
  | PostAffiliate
  | StoreActiveAffiliateById
  | StoreAffiliationRequest
  | StoreUserList
  | ConvertUserToAgent
  | RemoveUserFromList
  | StoreAgentBalance
  | SetAgentLimit
  ;
