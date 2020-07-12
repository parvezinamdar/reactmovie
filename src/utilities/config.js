// Configuration for TMDB
// To se the latest configuration fetch it from https://api.themoviedb.org/3/movie/550?api_key=039c157b8a7d8d06e48ff1a9cc0dd797


const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '039c157b8a7d8d06e48ff1a9cc0dd797';

// Images
// An image URL looks like this example:
// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg

const IMAGE_BASE_URL ='http://image.tmdb.org/t/p/';

//Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';

// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';

export {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE
}