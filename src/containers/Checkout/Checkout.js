import React, { Component } from "react";
import CheckoutSummary from "../../components/order/checkoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const Checkout = (props) => {
  const checkoutCanceledHandler = () => {
    props.history.goBack();
  };
  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  if (props.ing) {
    const purchaseRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchaseRedirect}
        <CheckoutSummary
          ingredients={props.ing}
          checkoutContinued={checkoutContinuedHandler}
          checkoutCanceled={checkoutCanceledHandler}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
