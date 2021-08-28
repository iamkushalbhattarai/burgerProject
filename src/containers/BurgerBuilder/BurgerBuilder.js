import React, { useState, useEffect, useCallback } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();

  const ing = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const price = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });
  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });
  const isAuthenticated = useSelector((state) => {
    return state.auth.token != null;
  });

  const onIngredientAdded = (ingName) =>
    dispatch(burgerBuilderActions.addedIngredients(ingName));
  const onIngredientRemove = (ingName) =>
    dispatch(burgerBuilderActions.removeIngredients(ingName));
  const onSetIngredients = useCallback(
    () => dispatch(burgerBuilderActions.initIngredients()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(burgerBuilderActions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(burgerBuilderActions.setAuthRedirectPath(path));

  useEffect(() => {
    onSetIngredients();
  }, [onSetIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };
  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };
  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };
  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...ing,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let burger = error ? <p>This ingredients cannot be loaded</p> : <Spinner />;
  let orderSummary = null;

  if (ing) {
    burger = (
      <Aux>
        <Burger ingredients={ing} />
        <BuildControls
          addedIngredients={onIngredientAdded}
          reducedIngredients={onIngredientRemove}
          disabled={disabledInfo}
          price={price}
          ordered={purchaseHandler}
          purchasable={updatePurchaseState(ing)}
          isAuth={isAuthenticated}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ing}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={price}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default WithErrorHandler(BurgerBuilder, axios);
