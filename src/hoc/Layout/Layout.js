import React, { Component } from "react";
import Aux from "../Auxiliary/Auxiliary";
import { connect } from "react-redux";
import classes from "./Layout.module.css";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  closeBarHandler = () => {
    this.setState({
      showSideDrawer: false,
    });
  };
  sideDrawerTogglerHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render(props) {
    return (
      <Aux>
        <ToolBar
          isAuth={this.props.isAuthenticated}
          drawerTogglerClicked={this.sideDrawerTogglerHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.closeBarHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
