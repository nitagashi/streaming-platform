import { Chip, Skeleton } from '@mui/material';
import CircularProgress from 'components/Pixi/CircularProgress';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import SeriesService from 'services/SeriesServices';
import EpisodeCard from './EpisodeCard';
import StarsRating from 'components/Pixi/StarsRating';
import SkeletonLoader from 'components/Loader/SkeletonLoader';

function SerieShow() {
    const [show, setShow] = useState([]);
    const [season, setSeason] = useState([]);
    const [currentSeason, setCurrentSeason] = useState(1);
    const params = useParams();
    const navigate = useNavigate();
    const { id } = params;
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        SeriesService.getSerieById(id).then((res) => {
            console.log(res.data);
            setShow(res.data)
        })
        fetchEpisodes(currentSeason);
        // eslint-disable-next-line
    }, [])
    const fetchEpisodes = (seasonNr) => {
        setSeason([])
        window.scrollTo({ top: 0, behavior: 'smooth' });
        SeriesService.getSerieEpisodes(params.id, seasonNr).then((res) => {
            setTimeout(() => {
                setSeason(res.data)
                setCurrentSeason(seasonNr);
            }, 500);
        })
    }
    const getPercentage = (percentage) => {
        return Math.round(percentage * 10)
    }
    const handleStarChange = (value) => {
        console.log(value);
    }
    return (
        <div className="Show">
            <div className='Show-Description'>
                <img className="Show-Banner" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${show.backdrop_path}`}></img>
                <div className="Show-ImageContainer">
                    <img className="Show-ImageContainer__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${season.poster_path}`} alt="Show Backdrop" />
                    <div>
                        <StarsRating onChange={handleStarChange} />
                    </div>
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
            <div className="Show-Season">
                <div className="Show-Season-Buttons">
                    {show.seasons != null ? show.seasons.map((season) => {
                        return <div className="Show-Season-BtnContainer"><button onClick={() => { fetchEpisodes(season.season_number) }} className={currentSeason === season.season_number ? "Show-Season__Btn-Active" : "Show-Season__Btn"}>Season {season.season_number}</button></div>
                    }) : ''}
                </div>
                <div className="Show-Season-Episodes">
                    {
                        season.episodes && season.episodes.length != 0 ? (
                            season.episodes != null ? season.episodes.map((episode) => {
                                if (episode.air_date != null)
                                    return (
                                        <div onClick={() => navigate(`/SerieVideo/${id}/${season.season_number}/${episode.episode_number}`)}>
                                            <EpisodeCard episode={episode} />
                                        </div>)
                                else
                                    return ''
                            }) : '')
                            : (
                                <SkeletonLoader number={20} width={275} height={200}/>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default SerieShow;