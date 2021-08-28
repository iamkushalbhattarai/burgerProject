import React from "react";
import classes from "./ToolBar.module.css";
import Logo from "../../LOGO/Logo.js";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggler from "../SideDrawer/DrawerToggler/DrawerToggler";
const ToolBar = (props) => {
  return (
    <header className={classes.ToolBar}>
      <DrawerToggler clicked={props.drawerTogglerClicked} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  );
};
export default ToolBar;
