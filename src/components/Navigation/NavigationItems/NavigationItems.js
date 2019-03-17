import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Home</NavigationItem>
            <NavigationItem link="/how-to-use">How Use</NavigationItem>
            <NavigationItem link="/about">About</NavigationItem>
        </ul>
    )
}

export default navigationItems