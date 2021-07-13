import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};
const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1,
  };
  const updatedIngredients = updatedObject(
    state.ingredients,
    updatedIngredient
  );
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientsName],
    building: true,
  };
  return updatedObject(state, updatedState);
};
const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1,
  };
  const updatedIngs = updatedObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientsName],
    building: true,
  };
  return updatedObject(state, updatedSt);
};

const setIngredient = (state, action) => {
  return updatedObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.salad,
      cheese: action.ingredients.salad,
      meat: action.ingredients.salad,
    },
    error: false,
    totalPrice: 4,
    building: false,
  });
};
const fetchIngredientFailed = (state, action) => {
  return updatedObject(state, { error: true });
};
const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientFailed(state, action);

    default:
      return state;
  }
};
export default burgerReducer;
