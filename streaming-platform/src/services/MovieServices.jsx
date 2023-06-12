import axios from "axios";

const ApiUrl = process.env.REACT_APP_API_MOVIEDB_URL;
const ApiKey = process.env.REACT_APP_API_MOVIEDB_KEY;

class movieService{
    async getMovies(page){
        return axios.get(`${ApiUrl}/discover/movie?api_key=${ApiKey}&page=${page}`)
    }
    async getTrendingMovies(){
        return axios.get(`${ApiUrl}/trending/movie/day?api_key=${ApiKey}`)
    }
    async getMovieById(id){
        return axios.get(`${ApiUrl}/movie/${id}?api_key=${ApiKey}`)
    }
    async getTopRated(){
        return axios.get(`${ApiUrl}/movie/top_rated?api_key=${ApiKey}`)
    }
    async getMovieVideo(id){
        return axios.get(`${ApiUrl}/movie/${id}/videos?api_key=${ApiKey}`)
    }
}
const MovieService = new movieService();
export default MovieService;