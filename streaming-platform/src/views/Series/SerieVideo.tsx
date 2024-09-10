import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SeriesService from 'services/SeriesServices';
import YouTube from 'react-youtube';
import VideoBorder from 'components/Pixi/StarsRating';
import { EpisodeModel, Season, ShowModel } from 'models/Models.types';

function SerieVideo() {
    const params = useParams()
    const navigate = useNavigate();
    const { idSerie = 0, seasonNr = 0, epNumber = 0 } = params;
    const [serie, setSerie] = useState(new ShowModel());
    const [currentSeason, setCurrentSeason] = useState(new Season());
    const [serieVideo, setSerieVideo] = useState(null);
    const [currentEpisode, setCurrentEpisode] = useState<number>(Number(epNumber));
    const [episodes, setEpisodes] = useState(Array(new EpisodeModel()));

    const opts = {
        height: '500px',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };
    useEffect(() => {
        fetchData(Number(seasonNr), Number(epNumber));
        // eslint-disable-next-line
    }, [])
    const fetchData = (seasonNr : number, epNumber : number) => {
        setCurrentEpisode(epNumber);
        SeriesService.getSerieEpisodes(idSerie, seasonNr).then((res) => {
            console.log(res.data);
            setCurrentSeason(res.data)
            setEpisodes(res.data.episodes)
        }).then(() => {
            SeriesService.getSerieEpisodesVideo(idSerie, seasonNr, epNumber).then((res) => {
                if (res.data.results.length > 0) {
                    setSerieVideo(res.data.results[0])
                }
                else {
                    setSerieVideo(null)
                }
            })
            SeriesService.getSerieById(idSerie).then((res) => {
                setSerie(res.data)
            })
        })

    }
    const changeEpisode = (epNumber: number) => {
        console.log(epNumber);
        navigate(`/SerieVideo/${idSerie}/${seasonNr}/${epNumber}`)
        fetchData(Number(seasonNr), epNumber);
    }
    const changeSeason = (season_number: number) => {
        navigate(`/SerieVideo/${idSerie}/${season_number}/1`)
        fetchData(season_number, 1);
    }
    return serie !== null ? (
        <div className='SerieVideo'>
            <div className='SerieVideo-Episodes'>
                <p className='SerieVideo-Episodes__Title'>Episode List</p>
                {episodes !== null ? episodes.map((episode) => {
                        return (
                            <button
                                className={currentEpisode == episode.number ? 'SerieVideo-Episodes__Btn active' : 'SerieVideo-Episodes__Btn'}
                                onClick={() => { changeEpisode(episode.number) }}>
                                <p className='SerieVideo-Episodes__Btn-EpNumber'>{episode.number}</p>
                                <p className='SerieVideo-Episodes__Btn-EpName'>{episode.name}</p>
                            </button>
                        )
                }) : ''}
            </div>
            <div className='SerieVideo-Video'>
                {
                    // serieVideo !== null ? (
                    //     <YouTube id="streamVideo" opts={opts} videoId={serieVideo.key} />
                    // ) : (
                        <video src={require('assets/NotAvailable.mp4')} controls autoPlay={true}></video>
                    // )
                }
                <div className='SerieVideo-Video__Description'>
                    <div>
                        You are watching:
                    </div>
                    <div>
                        {serie.name}
                    </div>
                    <div>
                        Season {seasonNr} Episode {epNumber}
                    </div>
                </div>
                <div className='SerieVideo-Video__Description'>
                    Watch more:
                    <div className='SerieVideo-Video_WatchMore__Seasons'>
                        {
                            serie !== null ?
                                serie.seasons.map((season) => {
                                    return (
                                        <div
                                            className={currentSeason.season_number === season.season_number ? "Show-Season__Btn-Active" : "Show-Season__Btn"}
                                            onClick={() => {
                                                changeSeason(season.season_number)
                                            }}
                                        >Season {season.season_number}</div>)
                                })
                                : (
                                    <div></div>
                                )
                        }
                    </div>
                </div>
            </div>
            {/* <video src={process.env.REACT_APP_YOUTUBE_URL + serieVideo.id} controls></video> */}
        </div>
    ) : (<div>Loading...</div>)
}

export default SerieVideo;