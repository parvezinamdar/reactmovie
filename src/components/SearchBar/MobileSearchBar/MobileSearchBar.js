import React,{ Component } from 'react';
import './MobileSearchBar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


class MobileSearchBar extends Component {
    
    state = {
        value: ''
    }
    timeout = null;

    searchChangeHandler = (event) => {
        //console.log(event.target.value);
        this.setState({
            value: event.target.value
        })
        clearTimeout(this.timeout);

        this.timeout = setTimeout( () => {
            this.props.handleChange(this.state.value);
        }, 500);
    }
    render(){
        let searchInput = ["SearchBar-1", "search-in"];
        if (this.props.open) {
            searchInput = ["SearchBar-1", "search-out"];
        }
        return(
           
            <div>
                <div className={searchInput.join(' ')} >
                    <input
                        type="text"
                        className="SearchBarInput-1"
                        placeholder="Search Movies"
                        onChange={this.searchChangeHandler}
                        value={this.state.value}
                    />
                </div>
                <div >
                    <FontAwesomeIcon icon={faSearch} onClick={this.props.searched} className="icon__search-1" />
                </div>
            </div>
        );
    }
    
}

export default MobileSearchBar;