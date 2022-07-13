import * as queryManagementActions from '../actions/query-management.actions';

export interface QueryManagementState {
  allElasticQuery: Array<any>;
  elasticQueryDetailsById: object;
}
export const initialQueryManagementState: QueryManagementState = {
  allElasticQuery: [],
  elasticQueryDetailsById: null
}
export function queryManagementReducer(state = initialQueryManagementState, action: queryManagementActions.QueryManagementReducerActions): QueryManagementState {
  switch (action.type) {
    case queryManagementActions.ActionTypes.storeElasticQuery: {
      return {
        ...state,
        allElasticQuery: action.payload
      };
    }
    case queryManagementActions.ActionTypes.storeElasticQueryById: {
      return {
        ...state,
        elasticQueryDetailsById: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
