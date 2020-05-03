import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

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

const addIngredient = (state, action) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
  }
  return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  const oldCount = state.ingredients[action.ingredientName];
  const newCount = oldCount >= 1 ? oldCount - 1 : 0;
  const updatedIngredientRemove = { [action.ingredientName]: newCount };
  const updatedIngredientsRemove = updateObject(state.ingredients, updatedIngredientRemove);
  const updatedStateRemove = {
    ingredients: updatedIngredientsRemove,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
  }
  return updateObject(state, updatedStateRemove);
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: {                   
    // just to map ingredients in fixed order (salad on top, meat on the bottom)
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4.0,
    error: false
  });
}

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);      
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.INGREDIENTS_LOADING_FAILED: return fetchIngredientsFailed(state, action);        
    default: return state;
  }
}

export default reducer;