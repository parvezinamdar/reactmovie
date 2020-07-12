import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ( props ) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" active>Home</NavigationItem>
        <NavigationItem link="/" >Movie</NavigationItem>
        <NavigationItem link="/" >Popular</NavigationItem>
        <NavigationItem link="/" >Latest</NavigationItem>
    </ul>
);

export default navigationItems;