import React from 'react';
import FourColGrid from '../FourColGrid/FourColGrid';
import MovieThumb from '../MovieThumb/MovieThumb';
import { IMAGE_BASE_URL, POSTER_SIZE} from '../../utilities/config';
import Spinner from '../Spinner/Spinner';
import noImage from '../../images/no_image.jpg'
import './SearchResult.css';

const searchResult = (props) => (
      

            
            <div className="slider-container">
                {props.loading ? <Spinner /> : null}
                <div className="clearfix">
                    {   !props.loading && props.searchTerm ? 
                        <span className="mediah5">
                            <h5>Search Result "{props.searchTerm}"</h5>
                        </span> : null 
                    }
                </div>
                <FourColGrid >
                    { props.movie.map((element,i) => {
                        return <MovieThumb 
                                key={i}
                                clickable={true}
                                image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`: `${noImage}`}
                                movieId={element.id}
                                movieName={element.title}
                                imdb={element.vote_average}
                            />
                        })}
                </FourColGrid>
            </div>
       
     
            

);

export default searchResult;