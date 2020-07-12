import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../utilities/config';

import { calcTime } from '../../utilities/helpers';
import MovieThumb from '../MovieThumb/MovieThumb';
import  './MovieInfo.css';
import imdb from '../../images/imdb.png'

const MovieInfo = (props) => {

    return(

            <div className="movie__info-background"
                        style={{ 
                            background:
                            `linear-gradient(to top, 
                            rgba(0,0,0,0.2) 39%, 
                            rgba(0,0,0,0.2) 41%, 
                            rgba(0,0,0,0.65) 100%),
                            url('${props.image}'),
                            #1c1c1c`,
                            boxShadow: `inset 0 -90px 40px -10px rgba(0,0,0,0.7)`   }}>
                
                <div className="movie__thumb-container">
                    <div className="movie__info-thumb">
                        <MovieThumb 
                            image={props.movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.movie.poster_path }` : '../../images/no_image.jpg'}    
                            clickable={false}
                        />
                    </div>
                    <div className="movie__info-description">
                        <div>
                            <h1>{props.movie.title}</h1>
                            <h5>{props.movie.tagline}</h5>  
                        </div>
                        {/* <div className="movie__info-runtime">
                            <span>Overview: </span>
                            <p>{props.movie.overview}</p>
                        </div> */}
                        <div className="movie__info-imdb">
                            <span className="imdb"><img src={imdb} alt="imdb"/></span>
                            <span className="alignment__element">{props.movie.vote_average}</span>
                        </div>
                        <div className="movie__info-genres">
                                { 
                                    props.movie.genres.length > 0 ? 
                                    <span>
                                        {
                                            props.movie.genres.map((element, i) => {
                                                return <span className="alignment__element" key={i}>{element.name}</span>
                                            })   
                                        }  
                                    </span> : 'NA' 
                                }   
                        </div>
                        <div className="movie__info-runtime">
                            <span className="color_white">Duration : </span>
                            <span>{calcTime(props.movie.runtime)}</span>
                        </div>
                        <div className="movie__info-directors">
                            {props.directors.length > 1 ? <span className="color_white">Directors : </span> : <span className="color_white">Director : </span>}
                       
                            { props.directors.length > 0 ? 
                                <span>
                                    {props.directors.map((element, i) => { return <span className="alignment__element" key={i} >{element.name}</span> })}
                                </span> : 'NA' 
                            }
                        </div>
                        <div className="movie__info-release">
                            <span className="color_white">Release : </span>
                            <span className="alignment__element">{props.movie.release_date}</span>
                        </div>
                        <div className="movie__info-actors">
                            {props.actors.length > 1 ? <span className="color_white">Actors : </span> : <span className="color_white">Actor : </span>}
                            { props.actors.length > 0 ? 
                                
                                <span>
                                    { 
                                        props.actors.map((element, i) => { 
                                        return <span className="alignment__element" key={i} >{element.name}</span> })} 
                                </span> : 'NA' 
                            }
                        </div>
                    </div>       
                </div>
            </div>

                
    )
}

export default MovieInfo;