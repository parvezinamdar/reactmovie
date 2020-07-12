import React , { Component } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE ,BACKDROP_SIZE} from '../../utilities/config';
import MovieInfo from '../../components/MovieInfo/MovieInfo';
import MovieThumb from '../../components/MovieThumb/MovieThumb';
import Spinner from '../../components/Spinner/Spinner';
import { Col } from "react-bootstrap";
import noImage from '../../images/no_image.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import './MovieDetailsInfo.css';

class MovieDetailsInfo extends Component {

    state = {
        movie: null,
        recommendations: [],
        similarMovies: [],
        directors: [],
        actors: [],
        movieVideo: [],
        loading: false,
        totalRecommendationResult : 0,
        totalSimilarResult : 0,
       
    }

    componentDidMount(){
        this.setState({loading: true}); 
        const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}&language=en-US`;
        const recommendationsMovies = `${API_URL}movie/${this.props.match.params.movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;
        const similarMovies = `${API_URL}movie/${this.props.match.params.movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`;
        const movieVideo = `${API_URL}movie/${this.props.match.params.movieId}/videos?api_key=${API_KEY}&language=en-US`;
        console.log('[Params]',this.props.match.params.movieId);
        this.fetchItem(endpoint);
        this.fetchRecommendationsMovie(recommendationsMovies);
        this.fetchSimilarMovieItem(similarMovies);
        this.fetchVideoItem(movieVideo);
    }

    fetchItem = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            console.log('[Movie DetailsInfo result 1]',result);
            console.log('StatusCODE',result.status_code);
            if(result.status_code){
                this.setState({ movie:null,loading:false });
            }else{
                this.setState({ 
                    movie:result,
                    statuscode: result.status_code}, () => {
                    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}/credits?api_key=${API_KEY}`;
                    
                    fetch(endpoint)
                    .then(result => result.json())
                    .then(result => {
                        console.log('[Movie DetailsInfo result 2]',result);
                 
                        const directors = result.crew.filter((member) => member.job === "Director");
                        
                        this.setState({
                            actors: result.cast.slice(0,6),
                            directors: directors,
                            loading:false
                        })
                    })
                })
            }
            
        })
        .catch(err => {
            console.log('[Movie DetailsInfo Result_Error]',err);
        })
    }

    fetchRecommendationsMovie = (endpoint) => {
        fetch(endpoint)
        .then(resultReccomendation => resultReccomendation.json())
            
        .then(resultReccomendation => {

            console.log('[Reccomendation]',resultReccomendation);

            this.setState({
                recommendations: [...this.state.recommendations, ...resultReccomendation.results.slice(0,4)], //results is coming from api i.e data
                loading: false,
                totalRecommendationResult: resultReccomendation.total_results
            })
        })
        .catch(err => {
            console.log('[Reccomendation Result_Error]',err);
        })
    }

    fetchSimilarMovieItem = (endpoint) => {
        fetch(endpoint)
        .then(resultSimilarMovies => resultSimilarMovies.json())
        .then(resultSimilarMovies => {
            console.log('[Similar Movies]',resultSimilarMovies);

            this.setState({
                similarMovies: [...this.state.similarMovies, ...resultSimilarMovies.results.slice(0,8)], //results is coming from api i.e data
                loading: false,
                totalSimilarResult: resultSimilarMovies.total_results
            })
        })
        .catch(err => {
            console.log('[Similar Movies Result_Error]',err);
        })
    }

    fetchVideoItem = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            console.log('[VideoItems]',result);  
           

            if(result.status_code){
                this.setState({ loading:false });
            }else{
                const movieVideo = result.results.filter((member) => member.type === "Trailer").slice(0,1);
                //const movieVideo = result.results.map(member => "https://www.youtube.com/embed/"+member.key).slice(0,1);
                console.log('[Movie Video]',movieVideo);
                this.setState({ 
                    movieVideo: movieVideo,
                })
            }  
        })
        .catch(err => {
            console.log('[VideoItems Result_Error]',err);
        })
    }
    
    render(){
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4
        };
        return (
            <div className="movie_detail-container">
                { this.state.loading ? <Spinner /> : null}
                { 
                    this.state.movie && !this.state.loading ? 
                        <div className="movie__detail-info">
                            <MovieInfo 
                                movie={this.state.movie} 
                                actors={this.state.actors} 
                                directors={this.state.directors} 
                                movieId={this.state.movie.id} 
                                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.movie.backdrop_path}`}
                            /> 
                        
                            {/* Recommendation */}
                            { 
                                !this.state.loading && this.state.totalRecommendationResult !== 0 ?   
                                    <div className="slider-container">
                                        <div className="clearfix">
                                            { 
                                                !this.state.loading && this.state.totalRecommendationResult ? 
                                                    <span className="mediah5">
                                                        <h5>Recommendations</h5>
                                                    </span>  : null 
                                            } 
                                        </div>
                                        <Slider {...settings}>
                                            {this.state.recommendations.map((element,i) => {
                                                return (
                                                    <React.Fragment key={i}>
                                                        <Col>
                                                            <MovieThumb 
                                                                key={i}
                                                                clickable={true}
                                                                image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`: `${noImage}`}
                                                                movieId={element.id}
                                                                movieName={element.original_title}
                                                            />
                                                        </Col>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </Slider>
                                    </div>
                                : null
                            }


                            {/* Similar Movies */}
                            { 
                                !this.state.loading && this.state.totalSimilarResult !== 0 ?
                                    <div className="slider-container top-rated">
                                        <div className="clearfix">
                                            { 
                                                !this.state.loading && this.state.similarMovies ? 
                                                <span className="mediah5">
                                                    <h5>Similar Movies</h5>
                                                </span>  : null  
                                            }  
                                        </div>
                                        <Slider {...settings}>
                                            {   this.state.similarMovies.map((element,i) => {
                                                    return (
                                                        <React.Fragment key={i}>
                                                            <Col>
                                                                <MovieThumb 
                                                                    key={i}
                                                                    clickable={true}
                                                                    image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`: `${noImage}`}
                                                                    movieId={element.id}
                                                                    movieName={element.original_title}
                                                                />
                                                            </Col>
                                                        </React.Fragment>
                                                    );
                                            })}
                                        </Slider>
                                    </div>
                                : null
                            }
                         
                        </div>//movie__detail-info End Here
                    : null
                }  
            </div>//movie_detail-container end here



                    /* {
                            this.state.movieVideo.length !== 0 ? 
                                <div className="movie__video-container">
                                    <span>Trailer</span>
                                    {
                                        this.state.movieVideo.map((element,i) => {
                                            return  <div className="movie__video-content" key={i}>
                                                        <iframe 
                                                            key={i}
                                                            width="100%"
                                                            height="100%"
                                                            src={`https://www.youtube.com/embed/${element.key}`}
                                                            frameBorder="0" 
                                                            title={element.name}
                                                            allowFullScreen>{`https://www.youtube.com/embed/${element.key}`}</iframe>    
                                                    </div>       
                                            })
                                    }            
                                </div>
                            : null 
                        } */
            //{ !this.state.actors && !this.state.loading ? <h1>No Movie Found</h1> : null }
        )
    }
}

export default MovieDetailsInfo;