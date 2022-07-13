import * as supplyChainActions from '../actions/supply-chain-management.action';

export interface supplyChainState {
  openOrders: object;
  manifestedPacks: object;
  inTransitPacks: object;
  delieveredPacks: object;
  disputedPacks: object;
  rtoPacks: any;
  rtoPacksIntransit: any;
  rtoPacksComplete: any;

  getReversePickup: any;
  shipperAccounts: object;
  shipperAccountPrices: object;
  scmDashboard: object;
}

export const initialSupplyChainState: supplyChainState = {
  openOrders: null,
  manifestedPacks: null,
  inTransitPacks: null,
  delieveredPacks: null,
  disputedPacks: null,
  rtoPacks: null,
  rtoPacksIntransit: null,
  rtoPacksComplete: null,
  getReversePickup: null,
  shipperAccounts: null,
  shipperAccountPrices: null,
  scmDashboard: null,
};

export function supplyChainReducer(
  state = initialSupplyChainState,
  action: supplyChainActions.manageSupplyChainActions
): supplyChainState {
  switch (action.type) {
    case supplyChainActions.ActionTypes.storeOpenOrdersSCM: {
      return {
        ...state,
        openOrders: action.payload,
      };
    }
    case supplyChainActions.ActionTypes.storeManifestedPacks: {
      return {
        ...state,
        manifestedPacks: action.payload,
      };
    }
    case supplyChainActions.ActionTypes.storeInTransitPacks: {
      return {
        ...state,
        inTransitPacks: action.payload,
      };
    }
    case supplyChainActions.ActionTypes.storeDelieveredPacks: {
      return {
        ...state,
        delieveredPacks: action.payload,
      };
    }
    case supplyChainActions.ActionTypes.storeDisputedPacks: {
      return {
        ...state,
        disputedPacks: action.payload,
      };
    }
    case supplyChainActions.ActionTypes.packRemoveFromListAdmin: {
      if (action.payload['list'] == 'manifested') {
        let prevManifestedPacks = state.manifestedPacks;
        prevManifestedPacks['packs'] = prevManifestedPacks['packs'].filter(
          pack => {
            return pack.pack_id !== action.payload['packId'];
          }
        );
        return {
          ...state,
          manifestedPacks: prevManifestedPacks,
        };
      } else if (action.payload['list'] == 'in-transit') {
        let prevInTransitPacks = state.inTransitPacks;
        prevInTransitPacks['packs'] = prevInTransitPacks['packs'].filter(
          pack => {
            return pack.pack_id !== action.payload['packId'];
          }
        );
        return {
          ...state,
          inTransitPacks: prevInTransitPacks,
        };
      } else if (action.payload['list'] == 'delivered') {
        let prevDelieveredPacks = state.delieveredPacks;
        console.log('SUPPLY CHAIN DELIVERY', state.delieveredPacks);
        prevDelieveredPacks && prevDelieveredPacks['packs'].map((pack, i) => {
          pack['seller_orders'].map((order, i) => {
            if (order.id == action.payload['orderId']) {
              pack['seller_orders'][i]['return_request_status'] = 'pending';
            }
          });
        });
        return {
          ...state,
          delieveredPacks: prevDelieveredPacks,
        };
      }
    }
    case supplyChainActions.ActionTypes.updatePackList: {
      if (action.payload['list'] == 'manifested' && action.payload['actionType'] == null) {
        let prevManifestedPacks = state.manifestedPacks;
        let index = prevManifestedPacks['packs'].findIndex(pack => pack.pack_id === action.payload['packId']);
        prevManifestedPacks['packs'][index] = action.payload['pack']
        return {
          ...state,
          manifestedPacks: prevManifestedPacks
        };
      } else if (action.payload['list'] == 'manifested' && action.payload['actionType'] == 'autoManifest') {
        let prevManifestedPacks = state.manifestedPacks;
        let index = prevManifestedPacks['packs'].findIndex(pack => pack.pack_id === action.payload['packId']);
        prevManifestedPacks['packs'][index]['state'] = 'manifested'
        prevManifestedPacks['packs'][index]['status'] = 'Manifested'
        return {
          ...state,
          manifestedPacks: prevManifestedPacks
        };
      };
    }
    case supplyChainActions.ActionTypes.storeRTOPackAdmin: {

      return {
        ...state,
        rtoPacks: action.payload
      };
    }
    case supplyChainActions.ActionTypes.storeRTOPackInTransitAdmin: {

      return {
        ...state,
        rtoPacksIntransit: action.payload
      };
    }
    case supplyChainActions.ActionTypes.storeRTOPackCompleteAdmin: {

      return {
        ...state,
        rtoPacksComplete: action.payload
      };
    }
    case supplyChainActions.ActionTypes.updateStoreRTOPackInTransitAdmin: {

      if (state.rtoPacks) {
        console.log("state.rtoPacks::::::::", state.rtoPacks)
        let payload = null
        payload = state.rtoPacks && state.rtoPacks['packs'].filter(data => {
          console.log("RTO To RTO Intransit redicer....................", data.pack_id,action.payload['pack_id'])
          return data.pack_id != action.payload['pack_id']
        })
        return {
          ...state,
          rtoPacks: {
            recordsTotal: (state.rtoPacks['recordsTotal'] - 1),
            packs: payload
          }
        };
      }
    }
    case supplyChainActions.ActionTypes.updateStoreRTOPackCompleteAdmin: {
      let payload = null
      payload = state.rtoPacksIntransit && state.rtoPacksIntransit['packs'].filter(data => {
        return data.pack_id != action.payload['pack_id']
      })
      return {
        ...state,
        rtoPacksIntransit: {
          recordsTotal: (state.rtoPacksIntransit['recordsTotal'] - 1),
          packs: payload
        }
      };
    }
    case supplyChainActions.ActionTypes.storeUpdateReversePickup: {
      let finalPayload;

      let prevPayload = state.getReversePickup ? state.getReversePickup : [];
      let payloadKey = action.payload['intransit_return_pack'] ? 'intransit_return_pack' : 'new_return_order_pack';
      console.log('Prepayload', prevPayload, action.payload);

      let index = prevPayload['packs'].findIndex(pack => pack.pack_id === action.payload[payloadKey]['pack_id']);
      console.log('Index', index, prevPayload['packs'][index]);
      if (prevPayload['packs'][index]['state'] == 'return_new') {
        console.log('In Trans return new', index, prevPayload, action.payload);
        prevPayload['packs'][index]['state'] = action.payload[payloadKey]['state'],
          prevPayload['packs'][index]['status'] = action.payload[payloadKey]['status']
        // prevPayload['packs'][index]['refund_method'] = action.payload[payloadKey]['request']['refund_method']

        finalPayload = prevPayload
      } else if (prevPayload['packs'][index]['state'] == 'return_intransit') {
        console.log('in transit Return in transit', prevPayload, action.payload);
        prevPayload['packs'].splice(index, 1);
        finalPayload = prevPayload;
        // finalPayload = prevPayload['packs'].filter(obj => {
        //   console.log('Object', obj, action.payload[payloadKey], obj['pack_id'] !== action.payload[payloadKey]['id']);
        //   return obj['pack_id'] !== action.payload[payloadKey]['id'];
        // });
      }

      return {
        ...state,
        getReversePickup: finalPayload,
      };
    }

    case supplyChainActions.ActionTypes.storeGetReversePickup: {
      console.log('storeGetReversePickup::::::::::::::::::::::::::::::::::::::::;')
      return {
        ...state,
        getReversePickup: action.payload,
      };
    }

    case supplyChainActions.ActionTypes.storeShipperPrice: {

      return {
        ...state,
        shipperAccountPrices: action.payload
      };
    }
    case supplyChainActions.ActionTypes.storeShippingAcccount: {

      return {
        ...state,
        shipperAccounts: action.payload
      };
    }

    case supplyChainActions.ActionTypes.storeScmDashboard: {

      return {
        ...state,
        scmDashboard: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
