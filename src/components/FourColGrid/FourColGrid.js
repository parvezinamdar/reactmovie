import React from 'react';
import './FourColGrid.css';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';


const FourColGrid = (props) => {

    const renderElements = () => {
         const gridElements = props.children.map((element, i) => {

             return(
                 <div key={i}
                    className="rmdbGridElement">
                    {element}
                 </div>
                 
             )
             
         })
         return gridElements;
         
    }

    return (
        <Container className="colgrid__container">
            <div className="rmdbGrid">
                <div className="rmdbGridContent">
                    {renderElements()}
                </div>
            </div>
        </Container>
    )
}

FourColGrid.propTypes = {
    header: PropTypes.string,
    loading: PropTypes.bool
}
export default FourColGrid;