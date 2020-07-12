import React, { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE} from '../../utilities/config';
import { Col } from "react-bootstrap";
import HeroImage from '../../components/HeroImage/HeroImage';
import MovieThumb from '../../components/MovieThumb/MovieThumb';
import FourColGrid from '../../components/FourColGrid/FourColGrid';
//Spinner
import Spinner from '../../components/Spinner/Spinner';

//Images
import popular from '../../images/popular.png';
import topRated from '../../images/top.png';
import noImage from '../../images/no_image.jpg'

//Slick Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import './Home.css';

class Home extends Component {
    state = {
        popularMovies: [],
        heroImage: null,
        topRatedMovie:[],
        upComingMovie:[],
        loading: false,
        currentPage: 1,
        totalPages: 0
    }

    //lifecycle methods
    componentDidMount(){
        this.setState({loading: true}); 
        const movieAPI = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        const topRatedMovieAPI = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
        const upComingMovie = `${API_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;

        this.fetchMovieItem(movieAPI);
        this.fetchTopRatedMovie(topRatedMovieAPI); 
        this.fetchUpComingMovie(upComingMovie);   
    }

    //convert raw data to javascript object
    fetchMovieItem = (endpoint) => {
        fetch(endpoint)
        .then(resultMovie => resultMovie.json())
        .then(resultMovie => {
            console.log('[Movie-result]',resultMovie);

            this.setState({
                popularMovies: [...this.state.popularMovies, ...resultMovie.results], //results is coming from api i.e data
                heroImage: this.state.heroImage || resultMovie.results[8], //short circuit
                loading: false,
                currentPage: resultMovie.page,
                totalPages: resultMovie.total_pages
            })
        })
        .catch(err => {
            console.log('[Movie-result_error]',err);
        })
    }

    fetchTopRatedMovie = (endpoint) => {
        fetch(endpoint)
        .then(resultTopRatedMovie => resultTopRatedMovie.json())
        .then(resultTopRatedMovie => {
            console.log('[Top-rated-movie-result]',resultTopRatedMovie);
            this.setState({
                topRatedMovie: [...this.state.topRatedMovie, ...resultTopRatedMovie.results], //results is coming from api i.e data
                loading: false,
                currentPage: resultTopRatedMovie.page,
                totalPages: resultTopRatedMovie.total_pages
            })
        })
        .catch(err => {
            console.log('[Top-rated-movie-result_error]',err);
        })
    }
    //convert raw data to javascript object
    fetchUpComingMovie = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            console.log('[Upcoming]',result);

            this.setState({
                upComingMovie: [...this.state.upComingMovie, ...result.results.slice(0,8)], //results is coming from api i.e data
                loading: false,
                currentPage: result.page,
                totalPages: result.total_pages,
            })
        })
        .catch(err => {
            console.log('[Upcoming Movie]',err);
        })
    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4
        };
        return (
          
        <div className="home__container">
            { this.state.loading ? <Spinner /> : null}
            {/* HeroImage */}
            { 
                this.state.heroImage ? 
                    <HeroImage 
                        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
                        title={this.state.heroImage.original_title}
                        text={this.state.heroImage.overview}
                        date={this.state.heroImage.release_date}
                        imdb={this.state.heroImage.vote_average}
                    />
                : null
            }

            {/* Popular Movie */}
            { 
                !this.state.loading && this.state.popularMovies !== 0 ? 
                        <div className="slider-container">
                            <div className="clearfix">
                            { 
                                !this.state.loading && this.state.popularMovies? 
                                <span className="mediah5">
                                    <h5>
                                        <img src={popular} alt="popular" />Popular Movies
                                        <span>
                                            <a className="linkDecor" to='/movie'>
                                                Browse All
                                            </a>
                                        </span>
                                    </h5>
                                </span>  : null 
                            } 
                            </div>
                            <Slider {...settings}>
                                {
                                    this.state.popularMovies.map((element,i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <Col>
                                                <MovieThumb
                                                    clickable={true}
                                                    image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`: `${noImage}`}
                                                    movieId={element.id}
                                                    movieName={element.title}
                                                    imdb={element.vote_average}
                                                />
                                            </Col>
                                        </React.Fragment>
                                    );
                                })}
                            </Slider>
                        </div>
                : null
            }

            {/* Top Rated Movie */}
            { 
                 !this.state.loading && this.state.topRatedMovie !== 0  ? 
                        <div className="slider-container top-rated">
                            <div className="clearfix">
                                { 
                                    !this.state.loading && this.state.topRatedMovie ? 
                                    <span className="mediah5">
                                        <h5>
                                            <img src={topRated} alt="top-rated" />Top Rated
                                            <span>
                                                <a className="linkDecor" to='/'>
                                                    Browse All
                                                </a>
                                            </span>
                                        </h5>
                                    </span>  : null 
                                }  
                            </div>
                            <Slider {...settings}>
                                {
                                    this.state.topRatedMovie.map((element,i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <Col>
                                                <MovieThumb
                                                    clickable={true}
                                                    image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`: `${noImage}`}
                                                    movieId={element.id}
                                                    movieName={element.title}
                                                    imdb={element.vote_average}
                                                />
                                            </Col>
                                        </React.Fragment>
                                    );
                                })}
                            </Slider>
                        </div>
                : null
            }
            { /* Mobile View Upcoming Movie*/ }
            { 
                 !this.state.loading && this.state.upComingMovie !== 0  ? 
                    <div className="container-2" id="mobile-upcoming">
                        <div className="slider-container top-rated">
                            <div className="clearfix">
                                { 
                                    !this.state.loading && this.state.upComingMovie !== 0  ? 
                                    <span className="mediah5">
                                        <h5 style={{color: '#ee2d2f'}}>
                                            Upcoming
                                        </h5>
                                    </span>  : null 
                                }  
                            </div>
                            <Slider {...settings}>
                                {
                                    this.state.upComingMovie.map((element,i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <Col>
                                                <MovieThumb
                                                    clickable={true}
                                                    image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`: `${noImage}`}
                                                    movieId={element.id}
                                                    movieName={element.title}
                                                    imdb={element.vote_average}
                                                />
                                            </Col>
                                        </React.Fragment>
                                    );
                                })}
                            </Slider>
                        </div>
                    </div>
                : null
            }
            
            {/* Upcoming Movie */}
            { 
                !this.state.loading && this.state.upComingMovie !== 0 ? 
                    <div className="container-2" id="desktop-upcoming">
                        <div className="slider-container">
                            <div className="clearfix">
                            { 
                                !this.state.loading && this.state.upComingMovie? 
                                <span className="mediah5">
                                    <h5 style={{color: '#ee2d2f'}}>Upcoming Movies</h5>
                                </span>  : null 
                            } 
                            </div>
                            <FourColGrid loading={this.state.loading} >
                                {this.state.upComingMovie.map((element,i) => {
                                    return <MovieThumb 
                                            key={i}
                                            clickable={true}
                                            image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`: './images/no_image.jpg'}
                                            movieId={element.id}
                                            movieName={element.title}
                                            imdb={element.vote_average}
                                        />
                                    })}
                            </FourColGrid>
                        </div>
                    </div>
                : null
            }
            
            
        </div>        
        );
    }
}

export default Home;