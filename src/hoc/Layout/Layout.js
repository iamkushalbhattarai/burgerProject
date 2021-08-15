import React, { Component } from "react";
import Aux from "../Auxiliary/Auxiliary";
import { connect } from "react-redux";
import classes from "./Layout.module.css";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  // const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
  state = {
    sideDrawerIsVisible: false,
  };

  closeBarHandler = () => {
    this.setState({ sideDrawerIsVisible: false });
  };
  sideDrawerTogglerHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerIsVisible: !prevState.sideDrawerIsVisible };
    });
  };
  render() {
    return (
      <Aux>
        <ToolBar
          isAuth={this.props.isAuthenticated}
          drawerTogglerClicked={this.sideDrawerTogglerHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.sideDrawerIsVisible}
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
