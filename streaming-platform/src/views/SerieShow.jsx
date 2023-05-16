import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SeriesService from 'services/SeriesServices';

function SerieShow() {
    const [show, setShow] = useState([]);
    const [season, setSeason] = useState([]);
    const params = useParams();
    useEffect(() => {
        SeriesService.getSerieById(params.id).then((res) => {
            console.log(res.data);
            setShow(res.data)
        })
        fetchEpisodes(1);
    }, [])
    const fetchEpisodes = (seasonNr) => {
        console.log(seasonNr);
        SeriesService.getSerieEpisodes(params.id, seasonNr).then((res) => {
            console.log(res.data);
            setSeason(res.data)
        })
    }
    return (
        <div className="Show">
            <div className="Show-ImageContainer">
                <img className="Show-ImageContainer__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${show.poster_path}`} alt="Show Backdrop" />
            </div>
            <div className='Show-Description'>
                <div className="Show-Description-Section">
                    <p><b>Name:</b> {show.name}</p>
                    <p><b>Status:</b> {show.status}</p>
                    <p><b>Airing Date:</b> {show.first_air_date}</p>
                    <p><b>Episodes:</b> {show.number_of_episodes}</p>
                </div>
                <div className="Show-Description-Section">
                    <div className="Show-Description-Section__Title">
                        <b>Genres:</b>
                    </div>
                    {show.genres != null ? show.genres.map((genre) => genre.name).join(', ') : ''}
                </div>
                <div className="Show-Description-Section">
                    <div className="Show-Description-Section__Title">
                        <b>Overview:</b><br />
                    </div>
                    {show.overview}
                </div>
                <div className="Show-Description-Section">
                    <div className="Show-Description-Section__Title">
                        <b>Seasons:</b>
                    </div>
                    <div className="Show-Description-Section--BtnContainer">
                        {show.seasons != null ? show.seasons.map((season) => {
                            return <button onClick={() => { fetchEpisodes(season.season_number) }} className="Show-Description-Section__Btn">{season.name}</button>
                        }) : ''}
                    </div>
                </div>
                <div className="Show-Description-Section">
                    <div className="Show-Description-Section__Title">
                        <b>Episodes:</b>
                    </div>
                    <div className="Show-Description-Section--BtnContainer">
                        {season.episodes != null ? season.episodes.map((episode) => {
                            return <button className="Show-Description-Section__Btn">Episode {episode.episode_number}</button>
                        }) : ''}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SerieShow;