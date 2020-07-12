import React from 'react';
import './DrawerToggle.css';
import user from '../../../../images/user.png';


const drawerToggle = (props) => (
    <div className="DrawerToggle" onClick={props.clicked}>
        <img src={user} alt="MyBurger" />
    </div>
);

export default drawerToggle;