import React , {Component} from 'react';
import Aux from '../Auxiliary/Auxiliary';
import './Layout.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import MobileSearchBar from '../../components/SearchBar/MobileSearchBar/MobileSearchBar';

class Layout extends Component {
    state = {
        showSideDrawer: false,
        showInputBar: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }
    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }
    inputDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            console.log(!prevState.showInputBar );
            return { 
                showInputBar: !prevState.showInputBar 
            };
            
        } );
    }

    render () {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}
                    change={this.props.change}/>
                <MobileSearchBar 
                    handleChange={this.props.change}
                    open={this.state.showInputBar}
                    searched={this.inputDrawerToggleHandler}        
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />

                <main className="content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


export default Layout;