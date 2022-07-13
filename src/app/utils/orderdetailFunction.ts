export const changeOrderStatus = ( status ) => {
    if( status === "accepted"){
        return "accept";
    } 
    else if( status === "new" ) {
        return "new";
    } 
    else if( status === "ready" ){
        return "ready";
    }
    else if( status === "picked_up" ){
        return "picked_up";
    }
    else if( status === "completed" ){
        return "completed";
    }
};