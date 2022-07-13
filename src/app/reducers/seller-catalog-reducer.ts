import * as sellerCatalogActions from '../actions/seller-catalog-action';


export interface sellerCatalogState {
    productCount: object;
    inStock: object;
    outOfStock: object;
    lowInventory: object;
    addedProductDetail: object;
    searchProductsList: object;
    searchBrandList: object;
    searchCategoryList: object;
    addToProductDetail: object;
    relationId: object;
    disabledByYou: object;
    priceBreakUp: object;
    nsppriceBreakUp: any;
    dashboard: any;
    userMenu: any;


}
export const initialCatalogState: sellerCatalogState = {
    productCount: null,
    inStock: {
        list: [],
        search: []
    },
    outOfStock: {
        list: [],
        search: []
    },
    lowInventory: {
        list: [],
        search: []
    },
    addedProductDetail: null,
    searchProductsList: null,
    searchBrandList: null,
    searchCategoryList: null,
    addToProductDetail: null,
    relationId: null,
    disabledByYou: {
        list: [],
        search: []
    },
    priceBreakUp: null,
    nsppriceBreakUp: [],
    dashboard: null,
    userMenu: null,


}



export function sellerCatalogReducer(state = initialCatalogState, action: sellerCatalogActions.manageSellerCatalogActions): sellerCatalogState {
    switch (action.type) {
        case sellerCatalogActions.ActionTypes.storeProductCount: {
            return {
                ...state,
                productCount: action.payload
            };
        }
        case sellerCatalogActions.ActionTypes.storeInStock: {

            let prevInStock = state.inStock['list'];
            let updatedInStock = null;
            if (state.inStock['list'].length > 0 && (action.refresh == false)) {
                prevInStock.push(...action.payload['data']);

                updatedInStock = prevInStock;

            }
            else {
                updatedInStock = action.payload['data'];
            }
            state.inStock['list'] = updatedInStock
            state.inStock['search'] = []
            return {
                ...state
            };
        }
        case sellerCatalogActions.ActionTypes.storeResultsOnSearch: {
            let prevInStock = state.inStock['search'];
            let updatedInStock = null;
            if (state.inStock['search'].length > 0 && (action.refresh == false)) {
                prevInStock.push(...action.payload['data']);

                updatedInStock = prevInStock;

            }
            else {
                updatedInStock = action.payload['data'];
            }
            state.inStock['search'] = updatedInStock
            state.inStock['list'] = []

            return {
                ...state
            };
        }
        case sellerCatalogActions.ActionTypes.storeOutOfStock: {
            let prevOutStock = state.outOfStock['list'];
            let updatedOutStock = null;
            if (state.outOfStock['list'].length > 0 && (action.refresh == false)) {

                prevOutStock.push(...action.payload['data']);
                updatedOutStock = prevOutStock;

            }
            else {
                updatedOutStock = action.payload['data'];
            }

            state.outOfStock['list'] = updatedOutStock;
            state.outOfStock['search'] = [];
            return {
                ...state,

            };
        }
        case sellerCatalogActions.ActionTypes.storeOutOfStockOnSearch: {



            let prevOutStock = state.outOfStock['search'];
            let updatedOutStock = null;
            if (state.outOfStock['search'].length > 0 && (action.refresh == false)) {

                prevOutStock.push(...action.payload['data']);
                updatedOutStock = prevOutStock;

            }
            else {
                updatedOutStock = action.payload['data'];
            }

            state.outOfStock['search'] = updatedOutStock;
            state.outOfStock['list'] = [];
            return {
                ...state,

            };
        }
        case sellerCatalogActions.ActionTypes.storeLowInventory: {


            let prevLowInventory = state.lowInventory['list'];
            let updatedLowInventory = null;
            if (state.lowInventory['list'].length > 0 && (action.refresh == false)) {

                prevLowInventory.push(...action.payload['data']);
                updatedLowInventory = prevLowInventory;

            }
            else {
                updatedLowInventory = action.payload['data'];
            }
            state.lowInventory['list'] = updatedLowInventory;
            state.lowInventory['search'] = [];

            return {
                ...state,

            };
        }
        case sellerCatalogActions.ActionTypes.storeLowInventoryOnSearch: {

            let prevLowInventory = state.lowInventory['search'];
            let updatedLowInventory = null;
            if (state.lowInventory['search'].length > 0 && (action.refresh == false)) {

                prevLowInventory.push(...action.payload['data']);
                updatedLowInventory = prevLowInventory;

            }
            else {
                updatedLowInventory = action.payload['data'];
            }
            state.lowInventory['search'] = updatedLowInventory;
            state.lowInventory['list'] = [];

            return {
                ...state,

            };
        }
        case sellerCatalogActions.ActionTypes.storeAddedProuctDetails: {
            return {
                ...state,
                addedProductDetail: action.payload
            };
        }
        case sellerCatalogActions.ActionTypes.storeSearchProducts: {
            console.log('reducer called');
            return {

                ...state,
                searchProductsList: action.payload
            };
        }
        case sellerCatalogActions.ActionTypes.storeSearchBrand: {
            return {

                ...state,
                searchBrandList: action.payload
            };
        }
        case sellerCatalogActions.ActionTypes.storeSearchCategory: {
            return {

                ...state,
                searchCategoryList: action.payload
            };
        }
        case sellerCatalogActions.ActionTypes.storeAddtoProductDetail: {
            console.log('reducer called')
            return {

                ...state,
                addToProductDetail: action.payload
            };
        }
        case sellerCatalogActions.ActionTypes.storeRealtionId: {

            return {

                ...state,
                relationId: action.payload
            };
        }
        case sellerCatalogActions.ActionTypes.storeDisabledByYou: {
            let prevDisabledByYou = state.disabledByYou['list'];
            let updatedDisabledByYou = null;
            if (state.disabledByYou['list'].length > 0 && (action.refresh == false)) {

                prevDisabledByYou.push(...action.payload['data']);
                updatedDisabledByYou = prevDisabledByYou;

            }
            else {
                updatedDisabledByYou = action.payload['data'];
            }
            state.disabledByYou['list'] = updatedDisabledByYou;
            state.disabledByYou['search'] = [];
            return {

                ...state,
            };
        }
        case sellerCatalogActions.ActionTypes.storeDisabledByYouOnSearch: {

            let prevDisabledByYou = state.disabledByYou['search'];
            let updatedDisabledByYou = null;
            if (state.disabledByYou['search'].length > 0 && (action.refresh == false)) {

                prevDisabledByYou.push(...action.payload['data']);
                updatedDisabledByYou = prevDisabledByYou;

            }
            else {
                updatedDisabledByYou = action.payload['data'];
            }
            state.disabledByYou['search'] = updatedDisabledByYou;
            state.disabledByYou['list'] = [];
            return {

                ...state,
            };
        }
        case sellerCatalogActions.ActionTypes.storePriceBreakShow: {

            return {

                ...state,
                priceBreakUp: action.payload
            };
        }
        case sellerCatalogActions.ActionTypes.storeNspBreakUp: {
            state.nsppriceBreakUp[action.payload.nspBreakUp.productId] = action.payload.nspBreakUp
            return {

                ...state,

            };
        }
        case sellerCatalogActions.ActionTypes.storeSellerDashboard: {

            return {

                ...state,
                dashboard: action.payload

            };
        }
        case sellerCatalogActions.ActionTypes.StoreUserMenu: {
            localStorage.setItem('adminNavMenu', JSON.stringify(action.payload));
            return {

                ...state,
                userMenu: action.payload

            };
        }
        case sellerCatalogActions.ActionTypes.removeOutofStockFromInstock: {
            if (action.payload['list'] == 'in_stock') {

                var previnStock;
                if (state.inStock['list'].length > 0) {
                    previnStock = state.inStock['list'];

                    if (action.payload['data'][0]['inventory'] == 0) {
                        previnStock = previnStock.filter(item => {

                            return item.storeProductId !== action.payload['data'][0]['storeProductId']
                        })
                    }
                    else {
                        previnStock.map((item, i) => {


                            if (action.payload['data'][0]['storeProductId'] == item.storeProductId) {
                                previnStock[i]['mrp'] = action.payload['data'][0]['mrp'];
                                previnStock[i]['sellingPrice'] = action.payload['data'][0]['sellingPrice'];
                                previnStock[i]['inventory'] = action.payload['data'][0]['inventory'];
                                previnStock[i]['netSellerPayable'] = action.payload['data'][0]['nsp'];
                            }

                        });
                    }

                    state.inStock['list'] = previnStock;

                }
                else {
                    previnStock = state.inStock['search'];

                    if (action.payload['data'][0]['inventory'] == 0) {
                        previnStock = previnStock.filter(item => {

                            return item.storeProductId !== action.payload['data'][0]['storeProductId']
                        })
                    }
                    else {
                        previnStock.map((item, i) => {


                            if (action.payload['data'][0]['storeProductId'] == item.storeProductId) {
                                previnStock[i]['mrp'] = action.payload['data'][0]['mrp'];
                                previnStock[i]['sellingPrice'] = action.payload['data'][0]['sellingPrice'];
                                previnStock[i]['inventory'] = action.payload['data'][0]['inventory'];
                                previnStock[i]['netSellerPayable'] = action.payload['data'][0]['nsp'];
                            }

                        });
                    }
                    state.inStock['search'] = previnStock;
                }

                if (action.payload['data'][0]['inventory'] == 0) {
                    state.productCount['counts']['InStock'] -= 1;
                    state.productCount['counts']['OutOfStock'] += 1;
                }
                if (state.addedProductDetail['data'][0]['inventory'] < 5 && action.payload['data'][0]['inventory'] == 0) {
                    state.productCount['counts']['LowInventory'] -= 1;
                }


                return {
                    ...state,

                };
            }
            if (action.payload['list'] == 'out_of_stock') {

                var prevOutOfStock;
                if (state.outOfStock['list'].length > 0) {
                    prevOutOfStock = state.outOfStock['list'];

                    if (action.payload['data'][0]['inventory'] > 0) {
                        prevOutOfStock = prevOutOfStock.filter(item => {

                            return item.storeProductId !== action.payload['data'][0]['storeProductId']
                        })
                    }
                    else {
                        prevOutOfStock.map((item, i) => {


                            if (action.payload['data'][0]['storeProductId'] == item.storeProductId) {
                                prevOutOfStock[i]['mrp'] = action.payload['data'][0]['mrp'];
                                prevOutOfStock[i]['sellingPrice'] = action.payload['data'][0]['sellingPrice'];
                                prevOutOfStock[i]['inventory'] = action.payload['data'][0]['inventory'];
                                prevOutOfStock[i]['netSellerPayable'] = action.payload['data'][0]['nsp'];
                            }

                        });
                    }

                    state.outOfStock['list'] = prevOutOfStock;

                }
                else {
                    prevOutOfStock = state.outOfStock['search'];

                    if (action.payload['data'][0]['inventory'] > 0) {
                        prevOutOfStock = prevOutOfStock.filter(item => {

                            return item.storeProductId !== action.payload['data'][0]['storeProductId']
                        })
                    }
                    else {
                        prevOutOfStock.map((item, i) => {


                            if (action.payload['data'][0]['storeProductId'] == item.storeProductId) {
                                prevOutOfStock[i]['mrp'] = action.payload['data'][0]['mrp'];
                                prevOutOfStock[i]['sellingPrice'] = action.payload['data'][0]['sellingPrice'];
                                prevOutOfStock[i]['inventory'] = action.payload['data'][0]['inventory'];
                                prevOutOfStock[i]['netSellerPayable'] = action.payload['data'][0]['nsp'];
                            }

                        });
                    }
                    state.outOfStock['search'] = prevOutOfStock;
                }


                if (action.payload['data'][0]['inventory'] > 0) {
                    state.productCount['counts']['InStock'] += 1;
                    state.productCount['counts']['OutOfStock'] -= 1;
                }





                return {
                    ...state,

                };
            }
            if (action.payload['list'] == 'low_inventory') {

                var prevLowInventory;
                if (state.lowInventory['list'].length > 0) {
                    prevLowInventory = state.lowInventory['list'];

                    if (action.payload['data'][0]['inventory'] == 0 || action.payload['data'][0]['inventory'] > 5) {
                        prevLowInventory = prevLowInventory.filter(item => {

                            return item.storeProductId !== action.payload['data'][0]['storeProductId']
                        })
                    }
                    else {
                        prevLowInventory.map((item, i) => {


                            if (action.payload['data'][0]['storeProductId'] == item.storeProductId) {
                                prevLowInventory[i]['mrp'] = action.payload['data'][0]['mrp'];
                                prevLowInventory[i]['sellingPrice'] = action.payload['data'][0]['sellingPrice'];
                                prevLowInventory[i]['inventory'] = action.payload['data'][0]['inventory'];
                                prevLowInventory[i]['netSellerPayable'] = action.payload['data'][0]['nsp'];
                            }

                        });
                    }

                    state.lowInventory['list'] = prevLowInventory;

                }
                else {
                    prevLowInventory = state.lowInventory['search'];

                    if (action.payload['data'][0]['inventory'] == 0 || action.payload['data'][0]['inventory'] > 5) {
                        prevLowInventory = prevLowInventory.filter(item => {

                            return item.storeProductId !== action.payload['data'][0]['storeProductId']
                        })
                    }
                    else {
                        prevLowInventory.map((item, i) => {


                            if (action.payload['data'][0]['storeProductId'] == item.storeProductId) {
                                prevLowInventory[i]['mrp'] = action.payload['data'][0]['mrp'];
                                prevLowInventory[i]['sellingPrice'] = action.payload['data'][0]['sellingPrice'];
                                prevLowInventory[i]['inventory'] = action.payload['data'][0]['inventory'];
                                prevLowInventory[i]['netSellerPayable'] = action.payload['data'][0]['nsp'];
                            }

                        });
                    }
                    state.lowInventory['search'] = prevLowInventory;
                }


                if (action.payload['data'][0]['inventory'] == 0) {
                    state.productCount['counts']['InStock'] -= 1;
                    state.productCount['counts']['OutOfStock'] += 1;
                    state.productCount['counts']['LowInventory'] -= 1;

                }

                if (action.payload['data'][0]['inventory'] != 0) {

                    if (action.payload['data'][0]['inventory'] > 5) {
                        state.productCount['counts']['LowInventory'] -= 1;

                    }
                }



                return {
                    ...state,

                };
            }
            if (action.payload['list'] == 'disable_by_you') {

                var prevDisabledByYou;
                if (state.disabledByYou['list'].length > 0) {
                    prevDisabledByYou = state.disabledByYou['list'];


                    prevDisabledByYou.map((item, i) => {


                        if (action.payload['data'][0]['storeProductId'] == item.storeProductId) {
                            prevDisabledByYou[i]['mrp'] = action.payload['data'][0]['mrp'];
                            prevDisabledByYou[i]['sellingPrice'] = action.payload['data'][0]['sellingPrice'];
                            prevDisabledByYou[i]['inventory'] = action.payload['data'][0]['inventory'];
                            prevDisabledByYou[i]['netSellerPayable'] = action.payload['data'][0]['nsp'];
                        }

                    });


                    state.disabledByYou['list'] = prevDisabledByYou;

                }
                else {
                    prevDisabledByYou = state.disabledByYou['search'];


                    prevDisabledByYou.map((item, i) => {


                        if (action.payload['data'][0]['storeProductId'] == item.storeProductId) {
                            prevDisabledByYou[i]['mrp'] = action.payload['data'][0]['mrp'];
                            prevDisabledByYou[i]['sellingPrice'] = action.payload['data'][0]['sellingPrice'];
                            prevDisabledByYou[i]['inventory'] = action.payload['data'][0]['inventory'];
                            prevDisabledByYou[i]['netSellerPayable'] = action.payload['data'][0]['nsp'];
                        }

                    });

                    state.disabledByYou['search'] = prevDisabledByYou;
                }



                return {
                    ...state,

                };
            }

        }

        case sellerCatalogActions.ActionTypes.removeActiveInActiveFromList: {
            if (action.payload['list'] == 'in_stock') {
                var prevInStock;
                if (state.inStock['list'].length > 0) {
                    prevInStock = state.inStock['list'];

                    prevInStock = prevInStock.filter(item => {
                        var flag = 1;

                        action.payload['data']['storeProductIds'].find(e => {
                            if (e == item.storeProductId) {
                                flag = 0;
                                return;
                            }


                        });
                        if (flag == 1) {

                            return item;
                        }

                    },
                    );

                    state.inStock['list'] = prevInStock;

                }
                else {
                    prevInStock = state.inStock['search'];

                    prevInStock = prevInStock.filter(item => {

                        var flag = 1;

                        action.payload['data']['storeProductIds'].find(e => {
                            if (e == item.storeProductId) {
                                flag = 0;
                                return;
                            }


                        });
                        if (flag == 1) {

                            return item;
                        }
                    },
                    );

                    state.inStock['search'] = prevInStock;
                }



                state.productCount['counts']['InStock'] -= action.payload['data']['storeProductIds'].length;
                state.productCount['counts']['LiveCount'] -= action.payload['data']['storeProductIds'].length;
                state.productCount['counts']['NotLiveCount'] += action.payload['data']['storeProductIds'].length;


                return {
                    ...state,

                };
            }
            if (action.payload['list'] == 'out_of_stock') {

                var prevOutOfStock;
                if (state.outOfStock['list'].length > 0) {
                    prevOutOfStock = state.outOfStock['list'];

                    prevOutOfStock = prevOutOfStock.filter(item => {

                        var flag = 1;

                        action.payload['data']['storeProductIds'].find(e => {
                            if (e == item.storeProductId) {
                                flag = 0;
                                return;
                            }


                        });
                        if (flag == 1) {

                            return item;
                        }

                    },
                    );

                    state.outOfStock['list'] = prevOutOfStock;

                }
                else {
                    prevOutOfStock = state.outOfStock['search'];

                    prevOutOfStock = prevOutOfStock.filter(item => {
                        var flag = 1;

                        action.payload['data']['storeProductIds'].find(e => {
                            if (e == item.storeProductId) {
                                flag = 0;
                                return;
                            }


                        });
                        if (flag == 1) {

                            return item;
                        }
                    },
                    );

                    state.outOfStock['search'] = prevOutOfStock;
                }


                state.productCount['counts']['OutOfStock'] -= action.payload['data']['storeProductIds'].length;
                state.productCount['counts']['LiveCount'] -= action.payload['data']['storeProductIds'].length;
                state.productCount['counts']['NotLiveCount'] += action.payload['data']['storeProductIds'].length;


                return {
                    ...state,

                };
            }
            if (action.payload['list'] == 'low_inventory') {

                var prevLowInventory;
                if (state.lowInventory['list'].length > 0) {
                    prevLowInventory = state.lowInventory['list'];

                    prevLowInventory = prevLowInventory.filter(item => {
                        var flag = 1;

                        action.payload['data']['storeProductIds'].find(e => {
                            if (e == item.storeProductId) {
                                flag = 0;
                                return;
                            }


                        });
                        if (flag == 1) {

                            return item;
                        }
                    },
                    );

                    state.lowInventory['list'] = prevLowInventory;

                }
                else {
                    prevLowInventory = state.lowInventory['search'];

                    prevLowInventory = prevLowInventory.filter(item => {
                        var flag = 1;

                        action.payload['data']['storeProductIds'].find(e => {
                            if (e == item.storeProductId) {
                                flag = 0;
                                return;
                            }


                        });
                        if (flag == 1) {

                            return item;
                        }
                    },
                    );

                    state.lowInventory['search'] = prevLowInventory;
                }

                // state.productCount['counts']['LowInventory'] -= action.payload['data']['storeProductIds'].length;
                state.productCount['counts']['LiveCount'] -= action.payload['data']['storeProductIds'].length;
                state.productCount['counts']['NotLiveCount'] += action.payload['data']['storeProductIds'].length;




                return {
                    ...state,

                };
            }
            if (action.payload['list'] == 'disable_by_you') {

                var prevDisabledByYou;
                if (state.disabledByYou['list'].length > 0) {
                    prevDisabledByYou = state.disabledByYou['list'];

                    prevDisabledByYou = prevDisabledByYou.filter(item => {
                        var flag = 1;

                        action.payload['data']['storeProductIds'].find(e => {
                            if (e == item.storeProductId) {
                                flag = 0;
                                return;
                            }


                        });
                        if (flag == 1) {

                            return item;
                        }

                    },
                    );

                    state.disabledByYou['list'] = prevDisabledByYou;

                }
                else {
                    prevDisabledByYou = state.disabledByYou['search'];

                    prevDisabledByYou = prevDisabledByYou.filter(item => {
                        var flag = 1;

                        action.payload['data']['storeProductIds'].find(e => {
                            if (e == item.storeProductId) {
                                flag = 0;
                                return;
                            }


                        });
                        if (flag == 1) {

                            return item;
                        }
                    },
                    );

                    state.disabledByYou['search'] = prevDisabledByYou;
                }

                state.productCount['counts']['DisabledByYou'] -= action.payload['data']['storeProductIds'].length;
                state.productCount['counts']['NotLiveCount'] -= action.payload['data']['storeProductIds'].length;
                state.productCount['counts']['LiveCount'] += action.payload['data']['storeProductIds'].length;



                return {
                    ...state,

                };
            }

        }
        default: {
            return state;
        }

    }

}





export interface sellerAdminCatalogState {
    adminProductCount: object;
    adminInStock: object;
    adminOutOfStock: object;
    adminLowInventory: object;
    adminDisabledByYou: object;
    categories: object;
    adminLinkedSellers: object;
    allActiveSellers: object;
    activeHsn: object;
    multiSellerlist: any;
    collection: object;
    adminTrackListing: any;
    sellerMerchantTrackingListing: any;
    catalogCommissionMode: any,
    productVariants: object,

}
export const initialAdminCatalogState: sellerAdminCatalogState = {
    adminProductCount: null,
    adminInStock: {
        list: [],
        search: []
    },
    adminOutOfStock: {
        list: [],
        search: []
    },
    adminLowInventory: {
        list: [],
        search: []
    },

    adminDisabledByYou: {
        list: [],
        search: []
    },
    adminLinkedSellers: {
        list: [],
        search: []
    },
    categories: null,
    allActiveSellers: null,
    activeHsn: null,
    multiSellerlist: [],
    collection: null,
    adminTrackListing: null,
    sellerMerchantTrackingListing: null,
    catalogCommissionMode: null,
    productVariants: []
}


export function sellerCatalogAdminReducer(state = initialAdminCatalogState, action: sellerCatalogActions.manageSellerAdminCatalogActions): sellerAdminCatalogState {
    switch (action.type) {
        case sellerCatalogActions.ActionTypes.storeAdminProductCount: {
            return {
                ...state,
                adminProductCount: action.payload
            };
        }
        case sellerCatalogActions.ActionTypes.storeAdminInStock: {

            let prevInStock = state.adminInStock['list'];
            let updatedInStock = null;
            if (state.adminInStock['list'].length > 0 && (action.refresh == false)) {
                prevInStock.push(...action.payload['data']);

                updatedInStock = prevInStock;

            }
            else {
                updatedInStock = action.payload['data'];
            }
            state.adminInStock['list'] = updatedInStock
            state.adminInStock['search'] = []
            return {
                ...state
            };
        }
        case sellerCatalogActions.ActionTypes.storeAdminInStockOnSearch: {
            let prevInStock = state.adminInStock['search'];
            let updatedInStock = null;
            if (state.adminInStock['search'].length > 0 && (action.refresh == false)) {
                prevInStock.push(...action.payload['data']);

                updatedInStock = prevInStock;

            }
            else {
                updatedInStock = action.payload['data'];
            }
            state.adminInStock['search'] = updatedInStock
            state.adminInStock['list'] = []
            return {
                ...state
            };
        }

        case sellerCatalogActions.ActionTypes.storeAdminOutOfStock: {
            let prevOutStock = state.adminOutOfStock['list'];
            let updatedOutStock = null;
            if (state.adminOutOfStock['list'].length > 0 && (action.refresh == false)) {

                prevOutStock.push(...action.payload['data']);
                updatedOutStock = prevOutStock;

            }
            else {
                updatedOutStock = action.payload['data'];
            }

            state.adminOutOfStock['list'] = updatedOutStock;
            state.adminOutOfStock['search'] = [];
            return {
                ...state,

            };
        }
        case sellerCatalogActions.ActionTypes.storeAdminOutOfStockOnSearch: {



            let prevOutStock = state.adminOutOfStock['search'];
            let updatedOutStock = null;
            if (state.adminOutOfStock['search'].length > 0 && (action.refresh == false)) {

                prevOutStock.push(...action.payload['data']);
                updatedOutStock = prevOutStock;

            }
            else {
                updatedOutStock = action.payload['data'];
            }

            state.adminOutOfStock['search'] = updatedOutStock;
            state.adminOutOfStock['list'] = [];
            return {
                ...state,

            };
        }
        case sellerCatalogActions.ActionTypes.storeAdminInActive: {

            let prevInActive = state.adminDisabledByYou['list'];
            let updatedInactive = null;
            if (state.adminDisabledByYou['list'].length > 0 && (action.refresh == false)) {

                prevInActive.push(...action.payload['data']);
                updatedInactive = prevInActive;

            }
            else {
                updatedInactive = action.payload['data'];
            }

            state.adminDisabledByYou['list'] = updatedInactive;
            state.adminDisabledByYou['search'] = [];
            return {
                ...state,

            };
        }
        case sellerCatalogActions.ActionTypes.storeAdminInActiveOnSearch: {



            let prevInActive = state.adminDisabledByYou['search'];
            let updatedInactive = null;
            if (state.adminDisabledByYou['search'].length > 0 && (action.refresh == false)) {

                prevInActive.push(...action.payload['data']);
                updatedInactive = prevInActive;

            }
            else {
                updatedInactive = action.payload['data'];
            }

            state.adminDisabledByYou['search'] = updatedInactive;
            state.adminDisabledByYou['list'] = [];
            return {
                ...state,

            };
        }

        case sellerCatalogActions.ActionTypes.storeAdminLinkedSellers: {

            let prevLinked = state.adminLinkedSellers['list'];
            let updatedLinked = null;
            if (state.adminLinkedSellers['list'].length > 0 && (action.refresh == false)) {

                prevLinked.push(...action.payload['data']);
                updatedLinked = prevLinked;

            }
            else {
                updatedLinked = action.payload['data'];
            }

            state.adminLinkedSellers['list'] = updatedLinked;
            state.adminLinkedSellers['search'] = [];
            return {
                ...state,

            };
        }

        case sellerCatalogActions.ActionTypes.storeCatalogAdminCategory: {

            return {
                ...state,
                categories: action.payload,
            };
        }
        case sellerCatalogActions.ActionTypes.storeAllActiveSellersForBulkUpload: {
            return {
                ...state,
                allActiveSellers: action.payload
            }
        }

        case sellerCatalogActions.ActionTypes.storeActiveHsnList: {

            return {
                ...state,
                activeHsn: action.payload,
            };
        }
        case sellerCatalogActions.ActionTypes.storeMultiSellerlist: {

            let prevMultiSellerlist = state.multiSellerlist;
            let updatedMultiSellerlist = null;
            if (state.multiSellerlist.length > 0 && (action.refresh == false)) {

                prevMultiSellerlist.push(...action.payload['data']);
                updatedMultiSellerlist = prevMultiSellerlist;

            }
            else {
                updatedMultiSellerlist = action.payload['data'];
            }
            state.multiSellerlist = updatedMultiSellerlist;



            return {
                ...state,
            };
        }
        case sellerCatalogActions.ActionTypes.resetAdminApprovalStatus: {

            let prevMultiSellerlist = state.multiSellerlist;

            if (action.payload['type'] == 'updateNdhAssuredPopularTranding') {
                prevMultiSellerlist.map((item, i) => {

                    if (action.payload['data']['masterPID'] == item.productId) {
                        if (typeof action.payload['data']['ndhAssured'] != 'undefined') {
                            prevMultiSellerlist[i]['ndhPromised'] = action.payload['data']['ndhAssured'];
                        }
                        if (typeof action.payload['data']['ndhPopular'] != 'undefined') {
                            prevMultiSellerlist[i]['ndhPopular'] = action.payload['data']['ndhPopular'];
                        }
                        if (typeof action.payload['data']['ndhTranding'] != 'undefined') {
                            prevMultiSellerlist[i]['ndhTrending'] = action.payload['data']['ndhTranding'];
                        }


                    }

                });
            }
            if (action.payload['type'] == 'updateAdminApproval') {
                prevMultiSellerlist.map((item, i) => {

                    if (action.payload['data']['masterPID'] == item.productId) {
                        prevMultiSellerlist[i]['adminApproval'] = action.payload['data']['adminApproval'];

                        if (action.payload['data']['adminApproval'] == '1') {
                            prevMultiSellerlist[i]['isActive'] = 1;
                        } else {
                            prevMultiSellerlist[i]['isActive'] = 0;
                        }


                    }

                });
            }
            if (action.payload['type'] == 'updateDimentions') {

                prevMultiSellerlist.map((item, i) => {

                    if (action.payload['data']['masterPID'] == item.productId) {

                        prevMultiSellerlist[i]['standardLength'] = action.payload['data']['length'];
                        prevMultiSellerlist[i]['standardWidth'] = action.payload['data']['width'];
                        prevMultiSellerlist[i]['standardHeight'] = action.payload['data']['height'];
                        prevMultiSellerlist[i]['standardWeight'] = action.payload['data']['weight'];
                        prevMultiSellerlist[i]['weightUnit'] = action.payload['data']['weightUnit'];
                        prevMultiSellerlist[i]['dimentionUnit'] = action.payload['data']['dimentionUnit'];

                    }

                });
            }
            // if (action.payload['type'] == 'sellerProductStatusChangeAdmin') {

            //     prevMultiSellerlist.map((item, i) => {

            //         if (action.payload['data']['masterPID'] == item.productId) {

            //             prevMultiSellerlist[i]['standardLength'] = action.payload['data']['length'];
            //             prevMultiSellerlist[i]['standardWidth'] = action.payload['data']['width'];
            //             prevMultiSellerlist[i]['standardHeight'] = action.payload['data']['height'];
            //             prevMultiSellerlist[i]['standardWeight'] = action.payload['data']['weight'];
            //             prevMultiSellerlist[i]['weightUnit'] = action.payload['data']['weightUnit'];
            //             prevMultiSellerlist[i]['dimentionUnit'] = action.payload['data']['dimentionUnit'];

            //         }

            //     });
            // }

            state.multiSellerlist = prevMultiSellerlist;


            return {
                ...state,
            };
        }
        case sellerCatalogActions.ActionTypes.storeCollection: {
            return {
                ...state,
                collection: action.payload['payload']
            };
        }
        case sellerCatalogActions.ActionTypes.storeAdminTrackListing: {
            return {
                ...state,
                adminTrackListing: action.payload['payload']
            };
        }
        case sellerCatalogActions.ActionTypes.storeMerchantTrackListing: {
            return {
                ...state,
                sellerMerchantTrackingListing: action.payload['payload']
            };
        }
        case sellerCatalogActions.ActionTypes.resetMerchantTrackListing: {
            return {
                ...state,
                sellerMerchantTrackingListing: null
            };
        }
        case sellerCatalogActions.ActionTypes.storeCommissionModeSellerCatalog: {
            return {
                ...state,
                catalogCommissionMode: action.payload['payload']
            };
        }
        case sellerCatalogActions.ActionTypes.storeProductVariants: {
            return {
                ...state,
                productVariants: action.payload['data']
            };
        }


        default: {
            return state;
        }


    }

}
