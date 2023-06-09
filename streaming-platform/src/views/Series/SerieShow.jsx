import { Chip } from '@mui/material';
import CircularProgress from 'components/Pixi/CircularProgress';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import SeriesService from 'services/SeriesServices';

function SerieShow() {
    const [show, setShow] = useState([]);
    const [season, setSeason] = useState([]);
    const [currentSeason, setCurrentSeason] = useState(1);
    const params = useParams();
    const navigate = useNavigate();
    const { id } = params;
    useEffect(() => {
        SeriesService.getSerieById(id).then((res) => {
            console.log(res.data);
            setShow(res.data)
        })
        fetchEpisodes(currentSeason);
        // eslint-disable-next-line
    }, [])
    const fetchEpisodes = (seasonNr) => {
        SeriesService.getSerieEpisodes(params.id, seasonNr).then((res) => {
            console.log(res.data);
            setSeason(res.data)
            setCurrentSeason(seasonNr);
        })
    }
    const getPercentage = (percentage) => {
        return percentage * 10
    }
    return (
        <div className="Show">
            <div className='Show-Description'>
                <img className="Show-Banner" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${show.backdrop_path}`}></img>
                <div className="Show-ImageContainer">
                    <img className="Show-ImageContainer__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${season.poster_path}`} alt="Show Backdrop" />
                </div>
                <div className='Show-Description-Sections'>
                    <div className="Show-Description-Section">
                        <p className="Show-Description-Section__Title">{season.name}</p>
                        <div className="Show-Description-Section__Genres">
                            {
                                show.genres != null ? show.genres.map((genre) => {
                                    return <Chip label={genre.name} size="small"></Chip>
                                })
                                    : ''
                            }
                        </div>
                        <CircularProgress percentage={getPercentage(show.vote_average)} />
                    </div>
                    <div className="Show-Description-Section">
                        <div>
                            <b>Description:</b><br />
                        </div>
                        {show.overview}
                    </div>
                </div>
            </div>
            <div>
                <div className="Show-Description-Section-Buttons">
                    {show.seasons != null ? show.seasons.map((season) => {
                        return <div className="Show-Description-Section-BtnContainer"><button onClick={() => { fetchEpisodes(season.season_number) }} className={currentSeason === season.season_number ? "Show-Description-Section__Btn-Active" : "Show-Description-Section__Btn"}>Season {season.season_number}</button></div>
                    }) : ''}
                </div>
                <div className="Show-Description-Section">
                    <div className="Show-Description-Section__Title">
                        <b>Episodes:</b>
                    </div>
                    <div className="Show-Description-Section--BtnContainer">
                        {season.episodes != null ? season.episodes.map((episode) => {
                            if (episode.air_date != null)
                                return <button onClick={() => navigate(`/SerieVideo/${id}/${season.season_number}/${episode.episode_number}`)} className="Show-Description-Section__Btn">Episode {episode.episode_number}</button>
                            else
                                return ''
                        }) : ''}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SerieShow;