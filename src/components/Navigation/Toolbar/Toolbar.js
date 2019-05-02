import React from "react";
import { Link } from "react-router-dom";

import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.toggleSideDrawer} />
      <div className={classes.Logo}>
        <Link  to='/'>
          <h2>ENC-DEC</h2>
        </Link>
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default toolbar;
