import { Chip, Rating, Skeleton } from '@mui/material';
import CircularProgress from 'components/Pixi/CircularProgress';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import EpisodeCard from './EpisodeCard';
import StarsRating from 'components/Pixi/StarsRating';
import SkeletonLoader from 'components/Loader/SkeletonLoader';
import { ShowModel } from 'models/Models.types';
import { Episode, type Season, useGetSeasonByShowQuery, useGetShowByIdQuery } from 'generated/graphql';
import CreateSeason from 'views/Admin/CreateSeason';

interface Show {
    show: ShowModel
}

function SerieShow() {
    // const [show, setShow] = useState<ShowModel>(new ShowModel());
    // const [season, setSeason] = useState<Season>(new Season());
    const [currentSeason, setCurrentSeason] = useState<number>(1);
    const [selectedSeason, setSelectedSeason] = useState<Season>();
    const [value, setValue] = React.useState<number | null>(2);
    const params = useParams();
    const navigate = useNavigate();
    const { id = '0', seasonParam } = params;
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    const { data: showData, loading: loadingShow, error: errorShow } = useGetShowByIdQuery({
        variables: {
            id: id
        },
    });

    const { data: seasonData, loading: loadingSeason, error: errorSeason } = useGetSeasonByShowQuery({
        variables: {
            id: id
        },
    });

    const seasons = seasonData?.seasons;


    useEffect(() => {
        if (seasons && !selectedSeason && !seasonParam) {
            setCurrentSeason(seasons[0]?.season_number)
            setSelectedSeason(seasons[0]);
            return
        }
    }, [seasons, selectedSeason, seasonParam]);

    const show = showData?.show;

    if (loadingShow || loadingSeason) return <p>Loading...</p>;
    if (errorShow || errorSeason) return <p>Loading...</p>;
    console.log(errorShow)
    console.log(errorSeason)

    if (!show) return <p>No show available</p>;

    // if (!selectedSeason) return <p>No show available</p>;
    const getPercentage = () => {
        return Math.round(Math.floor(Math.random() * 100))
    }
    const handleStarChange = (event: React.SyntheticEvent<Element, Event>, value: number | null) => {
        console.log(value);
    }
    return (
        <div className="Show">
            <div className='Show-Description'>
                <img alt='noImage' className="Show-Banner" src={`${process.env.REACT_APP_ASSETS_URL}/${show.banner}`}></img>
                <div className="Show-ImageContainer">
                    {
                        seasons ?
                            <img className="Show-ImageContainer__Img" src={`${process.env.REACT_APP_ASSETS_URL}/${selectedSeason?.poster_path}`} alt="Show Backdrop" />
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
                            <p className="Show-Description-Section-Titles__Title">{selectedSeason?.name}</p>
                        </div>
                        <div className="Show-Description-Section__Genres">
                            {
                                show.genres != null ? show.genres.map((genre) => {
                                    return <Chip label={genre?.genre.name} size="small"></Chip>
                                })
                                    : ''
                            }
                        </div>
                        <CircularProgress percentage={getPercentage()} />
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
                <div className="Show-Season-Buttons">
                    {seasons != null ? seasons.map((season) => {
                        return (
                            <div className="Show-Season-BtnContainer">
                                <button onClick={() => {
                                    setCurrentSeason(season.season_number)
                                    setSelectedSeason(season)
                                }} className={selectedSeason?.id === season.id ? "Show-Season__Btn-Active" : "Show-Season__Btn"}>Season {season.season_number}</button>
                            </div>
                        )
                    }) : ''}
                    <CreateSeason showId={Number(id)} />
                </div>
                <div className="Show-Season-Episodes">
                    {
                        selectedSeason ? (
                            selectedSeason.episodes != null ? selectedSeason.episodes.map((episode: Episode) => {
                                return (
                                    <div onClick={() => navigate(`/SerieVideo/${id}/${selectedSeason.id}/${episode.number}`)}>
                                        <EpisodeCard episode={episode} />
                                    </div>)

                            }) : <p>No season found</p>)
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