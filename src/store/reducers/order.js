import * as actionTypes from '../actions/actionTypes';

const initState = {

};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: {
            return state;
        }
        case actionTypes.PURCHASE_BURGER_FAIL: {
            return state;
        }
        default:
            return state;
    }
}

export default reducer;