import React, { useState, useEffect } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { updatedObject, checkValidity } from "../../shared/utility";
const Auth = (props) => {
  const [authForms, setAuthForms] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignup, setIsSignup] = useState(true);
  const { onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updatedObject(authForms, {
      [controlName]: updatedObject(authForms[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForms[controlName].validation
        ),
        touched: true,
      }),
    });

    setAuthForms(updatedControls);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForms.email.value, authForms.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementArray = [];
  for (let key in authForms) {
    formElementArray.push({ id: key, config: authForms[key] });
  }
  let form = formElementArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValid={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));
  if (props.loading) {
    form = <Spinner />;
  }
  let errorMessage = "";
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }
  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={(event) => submitHandler(event)}>
        {form}
        <Button btnType="Success">Submit</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        Switch To {isSignup ? "SIGNIN" : "SIGNUP"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
