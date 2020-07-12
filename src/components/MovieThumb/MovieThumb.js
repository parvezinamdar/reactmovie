import React from 'react';
import './MovieThumb.css';
import PropTypes from 'prop-types';

const MovieThumb = (props) => {
   
    let no_hover = props.clickable === false ? 'no_hover' : '';
    return (
        <div className={`rmdbMovieThumb ${no_hover}`}  >
            {   
                props.clickable ? 
                        <a href={`/${props.movieId} ${props.movieName}`} className="linkDecor">
                            
                            <div className="image-container">
                                <img src={props.image} alt="moviethumb" />
                            </div>
                            {/* <h5 className="movieThumbTitle mt-1">{props.movieName}</h5> */}
                        </a>
                    :   
                    <img src={props.image} alt="moviethumb" /> 
            }
            
        </div>
    )
}

MovieThumb.propTypes = {
    image: PropTypes.string,
    movieId: PropTypes.number,
    movieName: PropTypes.string
}

export default MovieThumb;