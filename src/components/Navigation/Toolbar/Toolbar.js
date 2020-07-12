import React from 'react';

import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';
import SearchBar from '../../SearchBar/SearchBar';
import SignIn from '../../SignIn/SignIn';
const toolbar = ( props ) => (
    <header className="Toolbar">
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <Logo />
        <nav className="DesktopOnly">
            <NavigationItems />
        </nav>
        <SearchBar  handleChange={props.change} />
        <SignIn />
    </header>
);

export default toolbar;