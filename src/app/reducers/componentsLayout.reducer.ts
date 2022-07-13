import * as componentActions from '../actions/components.actions';

export interface ComponentState {
  categoryParentSearchDetails: object;
}

export const initialCollectionState: ComponentState = {
  categoryParentSearchDetails: null
};

export function componentsLayoutReducer(
  state = initialCollectionState,
  action: componentActions.ComponentReducerActions
): ComponentState {
  switch (action.type) {
    case componentActions.ActionTypes.storeProductCategoryParentSearch: {
      return {
        ...state,
        categoryParentSearchDetails: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
