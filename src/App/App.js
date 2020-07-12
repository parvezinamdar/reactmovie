import React,{Component} from 'react';
import './App.css';
import { API_URL, API_KEY} from '../utilities/config';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchResult from '../components/SearchResult/SearchResult'
import Layout from '../hoc/Layout/Layout';
import Home from '../container/Home/Home'
import MovieDetailsInfo from '../container/MovieDetailsInfo/MovieDetailsInfo';
import Spinner from '../components/Spinner/Spinner';

class App extends Component {
  state = {
    movieResult: [],
    searchTerm:'',
    loading:false,
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
  }

  fetchAllItems = (endpoint) => {
    fetch(endpoint)
    .then(result => result.json())
    .then(result => {
        console.log('[result]',result);
        this.setState({
            movieResult: [...this.state.movieResult, ...result.results], 
            loading: false,
            currentPage: result.page,
            totalPages: result.total_pages,
            totalResults: result.total_results,
        })
        
    })
    .catch(err => {
        console.log('[FetchItem]',err);
    })
  }

  searchItems = (searchTerm) => {
    console.log('[Search]',searchTerm);
    let endpoint = ''
    this.setState({
        movieResult: [],
        loading: true,
        searchTerm: searchTerm,    
    })

    if(searchTerm === ''){
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    }
    else{
        endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
        
    }
    console.log('[Endpoint]',endpoint);
    this.fetchAllItems(endpoint);
  }

  searchChangeHandler(event) {
      const searchTerm = event.target.value;
      this.searchItems(searchTerm);
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Layout 
            change={this.searchItems}>
            {
              this.state.movieResult && this.state.searchTerm ? 
                <SearchResult 
                    searchTerm={this.state.searchTerm}
                    loading={this.state.loading}
                    movie={this.state.movieResult} /> :
                <Switch>
                  <Route path="/" component={Home} exact />
                  <Route path="/:movieId" component={MovieDetailsInfo} exact />
                </Switch>
            }
            
            
          </Layout>
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
