import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const addedIngredients = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientsName: ingName,
  };
};
export const removeIngredients = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientsName: ingName,
  };
};

export const setIngredients = (ingredient) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredient,
  };
};
export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get(
        "https://react-my-burger-b01e3-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};
