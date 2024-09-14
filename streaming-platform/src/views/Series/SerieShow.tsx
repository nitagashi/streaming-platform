import { Chip, Skeleton } from '@mui/material';
import CircularProgress from 'components/Pixi/CircularProgress';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import SeriesService from 'services/SeriesServices';
import EpisodeCard from './EpisodeCard';
import StarsRating from 'components/Pixi/StarsRating';
import SkeletonLoader from 'components/Loader/SkeletonLoader';
import { Season, ShowInfo, ShowModel } from 'models/Models.types';
import { useQuery } from '@apollo/client';
import { useGetShowByIdQuery } from 'generated/graphql';

interface Show {
    show: ShowModel
}

function SerieShow() {
    // const [show, setShow] = useState<ShowModel>(new ShowModel());
    const [season, setSeason] = useState<Season>(new Season());
    const [currentSeason, setCurrentSeason] = useState(1);
    const params = useParams();
    const navigate = useNavigate();
    const { id = '0' } = params;
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    const { data = { show: new ShowModel() }, loading, error } = useGetShowByIdQuery({
        variables: {
            id: id
        },
    });

    // const { loading, error, data = { show: new ShowModel() } } = useGetShowByIdQuery<Show>(GET_SHOW_BY_ID_QUERY, {
    //     variables: { id: id },
    // });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log(data)
    const { show } = data

    if(!show) return <p>No show available</p>;

    const getPercentage = (percentage: number) => {
        return Math.round(percentage * 10)
    }
    const handleStarChange = (value: number) => {
        console.log(value);
    }
    return (
        <div className="Show">
            <div className='Show-Description'>
                <img className="Show-Banner" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${show.banner}`}></img>
                <div className="Show-ImageContainer">
                    {
                        season ?
                            <img className="Show-ImageContainer__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${season.poster_path}`} alt="Show Backdrop" />
                            :
                            <Skeleton className="Show-ImageContainer__Img" variant="rectangular" width={240} height={360} />
                    }
                    <div>
                        <StarsRating onChange={handleStarChange} />
                    </div>
                </div>
                <div className='Show-Description-Sections'>
                    <div className="Show-Description-Section">
                        <div className="Show-Description-Section-Titles">
                            <p className="Show-Description-Section-Titles__Title">{show.name}</p>
                            <p className="Show-Description-Section-Titles__Title"> - </p>
                            <p className="Show-Description-Section-Titles__Title">{season.name}</p>
                        </div>
                        <div className="Show-Description-Section__Genres">
                            {
                                show.genres != null ? show.genres.map((genre) => {
                                    return <Chip label={genre.name} size="small"></Chip>
                                })
                                    : ''
                            }
                        </div>
                        {/* <CircularProgress percentage={getPercentage(show.vote_average)} /> */}
                    </div>
                    <div className="Show-Description-Section">
                        <div>
                            <b>Description:</b><br />
                        </div>
                        {show.description}
                    </div>
                </div>
            </div>
            <div className="Show-Season">
                {/* <div className="Show-Season-Buttons">
                    {show.seasons != null ? show.seasons.map((season) => {
                        return <div className="Show-Season-BtnContainer"><button onClick={() => { fetchEpisodes(season.season_number) }} className={currentSeason === season.season_number ? "Show-Season__Btn-Active" : "Show-Season__Btn"}>Season {season.season_number}</button></div>
                    }) : ''}
                </div> */}
                <div className="Show-Season-Episodes">
                    {
                        season.episodes && season.episodes.length != 0 ? (
                            season.episodes != null ? season.episodes.map((episode) => {
                                return (
                                    <div onClick={() => navigate(`/SerieVideo/${id}/${season.season_number}/${episode.number}`)}>
                                        <EpisodeCard episode={episode} />
                                    </div>)

                            }) : '')
                            : (
                                <SkeletonLoader number={20} width={275} height={200} />
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default SerieShow;