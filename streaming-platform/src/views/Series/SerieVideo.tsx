import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EpisodeModel, Season, ShowModel } from 'models/Models.types';
import { useGetSeasonByShowQuery, useGetShowByIdQuery } from 'generated/graphql';

function SerieVideo() {
    const params = useParams();
    const navigate = useNavigate();
    const { idSerie = '0', seasonNr, epNumber } = params;
    const [currentEpisode, setCurrentEpisode] = useState<number>(Number(epNumber));
    const [episodes, setEpisodes] = useState<Array<EpisodeModel>>([]);

    const { data: showData, loading: loadingShow, error: errorShow } = useGetShowByIdQuery({
        variables: {
            id: idSerie
        },
    });

    const { data: seasonData, loading: loadingSeason, error: errorSeason } = useGetSeasonByShowQuery({
        variables: {
            id: idSerie
        },
    });

    useEffect(() => {
        if (seasonData) {
            //@ts-expect-error a
            const currentSeason = seasonData.seasons.find((season: Season) => season.id === seasonNr);
            //@ts-expect-error a
            setEpisodes(currentSeason?.episodes || []);
        }
    }, [seasonData, seasonNr]);

    const changeEpisode = (epNumber: number) => {
        navigate(`/SerieVideo/${idSerie}/${seasonNr}/${epNumber}`);
        setCurrentEpisode(epNumber);
    };

    const changeSeason = (season_id: number) => {
        navigate(`/SerieVideo/${idSerie}/${season_id}/1`);
        setCurrentEpisode(1);
    };

    if (loadingShow || loadingSeason) return <div>Loading...</div>;
    if (errorShow || errorSeason) return <div>Error loading data</div>;

    const serie = showData?.show;
    const seasons = seasonData?.seasons;
    
    //@ts-expect-error a
    const currentSeason = seasonData?.seasons.find((season: Season) => season.id === seasonNr);
    const currentEpisodeData = episodes.find((episode) => episode.number === currentEpisode);
    console.log(currentEpisodeData)
    return serie ? (
        <div className='SerieVideo'>
            <div className='SerieVideo-Episodes'>
                <p className='SerieVideo-Episodes__Title'>Episode List</p>
                {episodes && episodes.length > 0 ? episodes.map((episode) => {
                    return (
                        <button
                            key={episode.id}
                            className={currentEpisode === episode.number ? 'SerieVideo-Episodes__Btn active' : 'SerieVideo-Episodes__Btn'}
                            onClick={() => { changeEpisode(episode.number) }}>
                            <p className='SerieVideo-Episodes__Btn-EpNumber'>{episode.number}</p>
                            <p className='SerieVideo-Episodes__Btn-EpName'>{episode.name}</p>
                        </button>
                    )
                }) : ''}
            </div>
            <div className='SerieVideo-Video'>
                {
                currentEpisodeData ? (
                    <video
                        src={`${process.env.REACT_APP_ASSETS_URL}/${currentEpisodeData.path}`}
                        controls
                        width="100%"
                        height="500px"
                    />
                ) : (
                    <video src={require('assets/NotAvailable.mp4')} controls autoPlay={true}></video>
                )}
                <div className='SerieVideo-Video__Description'>
                    <div className='info'>
                        You are watching:
                    </div>
                    <div className='info-name'>
                        {serie.name}
                    </div>
                    <div className='season'>
                        Season: {currentSeason?.name} - Episode {epNumber}
                    </div>
                    <div className='description'>
                        {currentEpisodeData?.description} - Episode {epNumber}
                    </div>
                </div>
                <div className='SerieVideo-Video__Description'>
                    Watch more:
                    <div className='SerieVideo-Video_WatchMore__Seasons'>

                        {
                            //@ts-expect-error a
                            seasons.map((season) => (
                                <div
                                    key={season.id}
                                    className={currentSeason?.id === season.id ? "Show-Season__Btn-Active" : "Show-Season__Btn"}
                                    onClick={() => {
                                        changeSeason(Number(season.id));
                                    }}
                                >
                                    Season {season.season_number}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    ) : (<div>Loading...</div>);
}

export default SerieVideo;
