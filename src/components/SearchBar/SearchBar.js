import React, { Component} from 'react';
import './SearchBar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Searchbar extends Component {
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
        return(
           
                <div className="SearchBar" >
                    <form>
                        <input
                        type="text"
                        className="SearchBarInput"
                        placeholder="Search Movies"
                        
                        onChange={this.searchChangeHandler}
                        value={this.state.value}
                        />
                    </form>
                
                <FontAwesomeIcon icon={faSearch} className="icon__search"/>
                </div>

               
           
            
            
        );
    }
}

export default Searchbar;