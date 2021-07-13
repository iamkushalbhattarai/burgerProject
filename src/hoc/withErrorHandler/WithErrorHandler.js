import React, { Component } from "react";
import Modal from "../../components/UI/modal/Modal.js";
import Aux from "../Auxiliary/Auxiliary";

const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentDidMount() {
      this.requestInterceptors = axios.interceptors.request.use((req) => {
        this.setState({
          error: null,
        });
        return req;
      });
      this.requestInterceptors = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({
            error: error,
          });
        }
      );
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptors);
      axios.interceptors.response.eject(this.requestInterceptors);
    }
    errorConfirmedHandler = () => {
      this.setState({
        error: null,
      });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            //   modalClosed={this.errorConfirmedHandler}
            // >
            //   {this.state.error ? this.state.error.message : null}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default WithErrorHandler;
