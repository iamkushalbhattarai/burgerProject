import React, {useState} from "react";
import Aux from "../Auxiliary/Auxiliary";
import { connect } from "react-redux";
import classes from "./Layout.module.css";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout=props=> {
const [showSideDrawer, setSideDrawer] = useState(false)
  const closeBarHandler = () => {
    setSideDrawer(false);
    }
 const  sideDrawerTogglerHandler = () => {
   setSideDrawer(!showSideDrawer);
  };

    return (
      <Aux>
        <ToolBar
          isAuth={props.isAuthenticated}
          drawerTogglerClicked={sideDrawerTogglerHandler}
        />
        <SideDrawer
          isAuth={props.isAuthenticated}
          open={showSideDrawer}
          closed={closeBarHandler}
        />
        <main className={classes.Content}>{props.children}</main>
      </Aux>
    );
  }

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
