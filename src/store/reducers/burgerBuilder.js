import * as actionTypes from '../actions/actionTypes';

const initState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4.0,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1.2,
  meat: 3.5,
  bacon: 1.0   
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
    }
    case actionTypes.REMOVE_INGREDIENT: {
      const oldCount = state.ingredients[action.ingredientName];
      const newCount = oldCount >= 1 ? oldCount - 1 : 0;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: newCount
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
    }
    default:
      console.log('Unknown action type');
  }
  
  return state;
}

export default reducer;