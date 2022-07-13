import * as manageAffiliateActions from '../actions/affiliate-group-action';

export interface affiliateGroupState {
  affiliateGroups: object;
  affiliateGroupDetail: object;
  distributors: object;
  distributorDetail: object;
  activeAffiliates: object;
  affiliatesDetail: object;
  affiliationRequest: object;
  userList: object;
  agentBalance: object;
  totalActiveAffiliates: object;
}

export const initialAffiliateState: affiliateGroupState = {
  affiliateGroups: null,
  distributors: null,
  affiliateGroupDetail: null,
  distributorDetail: null,
  activeAffiliates: null,
  affiliatesDetail: null,
  affiliationRequest: null,
  userList: null,
  agentBalance: null,
  totalActiveAffiliates: null,

};

export function affiliateGroupReducer(
  state = initialAffiliateState,
  action: manageAffiliateActions.manegeAffiliateGroupActions
): affiliateGroupState {
  switch (action.type) {
    case manageAffiliateActions.ActionTypes.storeAffiliateGroups: {
      return {
        ...state,
        affiliateGroups: action.payload,
      };
    }
    case manageAffiliateActions.ActionTypes.storeDistributors: {
      return {
        ...state,
        distributors: action.payload,
      };
    }
    case manageAffiliateActions.ActionTypes.storeAffiliateGroupDetail: {
      return {
        ...state,
        affiliateGroupDetail: action.payload,
      };
    }
    case manageAffiliateActions.ActionTypes.storeDistributorDetail: {
      return {
        ...state,
        distributorDetail: action.payload,
      };
    }
    case manageAffiliateActions.ActionTypes.storeActiveAffiliate: {
      return {
        ...state,
        activeAffiliates: action.payload['payload'],
        totalActiveAffiliates: action.payload['totalRecords'],
      };
    }
    case manageAffiliateActions.ActionTypes.storeActiveAffiliateById: {
      return {
        ...state,
        affiliatesDetail: action.payload,
      };
    }
    case manageAffiliateActions.ActionTypes.storeAffiliationRequest: {
      return {
        ...state,
        affiliationRequest: action.payload,
      };
    }
    case manageAffiliateActions.ActionTypes.storeUserList: {
      return {
        ...state,
        userList: action.payload,
      };
    }
    case manageAffiliateActions.ActionTypes.removeUserFromList: {
      var prevuserList = state.userList['users'];

      prevuserList = prevuserList.filter(item => {
        return item.id !== action.payload['user']['id'];
      });


      state.userList['users'] = prevuserList;

      return {
        ...state,

      };
    }

    case manageAffiliateActions.ActionTypes.storeAgentBalance: {
      return {
        ...state,
        agentBalance: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
