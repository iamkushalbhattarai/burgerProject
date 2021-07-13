import React, { Component } from "react";
import classes from "./modal.module.css";
import BackDrop from "../Backdrop/BackDrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
class Modal extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== this.props.show;
  // }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  // componentWillUpdate() {
  //   console.log("model.js will update");
  // }


  render() {
    return (
      <Aux>
        <BackDrop
          show={this.props.show}
          clicked={this.props.modalClosed}
          onClick={this.props.clicked}
        />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
