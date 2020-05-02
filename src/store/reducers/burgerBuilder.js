import * as actionTypes from '../actions/actionTypes';

const initState = {
  ingredients: null,
  totalPrice: 4.0,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1.2,
  meat: 3.5,
  bacon: 1.0   
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.REMOVE_INGREDIENT:
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
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        // just to map ingredients in fixed order (salad on top, meat on the bottom)
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        totalPrice: 4.0,
        error: false
      };
    case actionTypes.INGREDIENTS_LOADING_FAILED: 
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
}

export default reducer;