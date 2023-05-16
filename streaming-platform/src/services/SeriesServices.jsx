import axios from "axios";

const ApiUrl = process.env.REACT_APP_API_MOVIEDB_URL;
const ApiKey = process.env.REACT_APP_API_MOVIEDB_KEY;

class seriesService{
    async getTrendingSeries(){
        return axios.get(`${ApiUrl}/trending/tv/week?api_key=${ApiKey}`)
    }
    async getSerieById(id){
        return axios.get(`${ApiUrl}/tv/${id}?api_key=${ApiKey}`)
    }
    async getTopRated(){
        return axios.get(`${ApiUrl}/tv/top_rated?api_key=${ApiKey}`)
    }
}
const SeriesService = new seriesService();
export default SeriesService;