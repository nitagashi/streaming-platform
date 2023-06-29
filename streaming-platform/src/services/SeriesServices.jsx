import axios from "axios";

const ApiUrl = process.env.REACT_APP_API_MOVIEDB_URL;
const ApiKey = process.env.REACT_APP_API_MOVIEDB_KEY;
axios.defaults.headers['Cache-Control'] = 'no-cache';

class seriesService{
    async getSeries(page){
        return axios.get(`${ApiUrl}/discover/tv?api_key=${ApiKey}&page=${page}`)
    }
    async getTrendingSeries(){
        return axios.get(`${ApiUrl}/trending/tv/week?api_key=${ApiKey}`)
    }
    async getSerieById(id){
        return axios.get(`${ApiUrl}/tv/${id}?api_key=${ApiKey}`)
    }
    async getSerieEpisodes(id, season){
        return axios.get(`${ApiUrl}/tv/${id}/season/${season}?api_key=${ApiKey}`)
    }
    async getSerieEpisodesVideo(idSerie, seasonNr, epNumber){
        return axios.get(`${ApiUrl}/tv/${idSerie}/season/${seasonNr}/episode/${epNumber}/videos?api_key=${ApiKey}`)
    }
    async getTopRated(){
        return axios.get(`${ApiUrl}/tv/top_rated?api_key=${ApiKey}`)
    }
    async search(query, page){
        return axios.get(`${ApiUrl}/search/multi?api_key=${ApiKey}&query=${query}&page=${page}`)
    }
}
const SeriesService = new seriesService();
export default SeriesService;