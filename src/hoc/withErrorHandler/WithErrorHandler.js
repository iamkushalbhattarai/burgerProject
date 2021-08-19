import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/modal/Modal.js";
import Aux from "../Auxiliary/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    const requestInterceptors = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });
    const responseInterceptors = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        setError(error);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptors);
        axios.interceptors.response.eject(responseInterceptors);
      };
    }, [requestInterceptors, responseInterceptors]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Aux>
        <Modal
          show={error}
          //   modalClosed={this.errorConfirmedHandler}
          // >
          //   {this.state.error ? this.state.error.message : null}
          modalClosed={errorConfirmedHandler}
        >
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
