import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SeriesService from 'services/SeriesServices';
import YouTube from 'react-youtube';

function SerieVideo() {
    const params = useParams()
    const navigate = useNavigate();
    const { idSerie, seasonNr, epNumber } = params;
    const [serieVideo, setSerieVideo] = useState(null);
    const [currentEpisode, setCurrentEpisode] = useState(epNumber);
    const [episodes, setEpisodes] = useState(null);

    const opts = {
        height: '500px',
        width: '90%',
        playerVars: {
            autoplay: 0,
        },
    };
    useEffect(() => {
        fetchData(epNumber);
    }, [])
    const fetchData = (epNumber) => {
        setCurrentEpisode(epNumber);
        SeriesService.getSerieEpisodes(idSerie, seasonNr).then((res) => {
            setEpisodes(res.data.episodes)
        }).then(() => {
            SeriesService.getSerieEpisodesVideo(idSerie, seasonNr, epNumber).then((res) => {
                console.log(res.data);
                if (res.data.results.length > 0) {
                    setSerieVideo(res.data.results[0])
                }
                else {
                    setSerieVideo(null)
                }
            })
        })

    }
    const changeEpisode = (epNumber) => {
        console.log(epNumber);
        navigate(`/SerieVideo/${idSerie}/${seasonNr}/${epNumber}`)
        fetchData(epNumber);
    }
    return (
        <div className='SerieVideo'>
            <div className='SerieVideo-Episodes'>
                <p className='SerieVideo-Episodes__Title'>Episode List</p>
                {episodes != null ? episodes.map((episode) => {
                    if (episode.air_date != null)
                        return <button className={currentEpisode == episode.episode_number ? 'SerieVideo-Episodes__Btn active' : 'SerieVideo-Episodes__Btn'} onClick={() => { changeEpisode(episode.episode_number) }}><p className='SerieVideo-Episodes__Btn-EpNumber'>{episode.episode_number}</p><p className='SerieVideo-Episodes__Btn-EpName'>{episode.name}</p></button>
                    else
                        return ''
                }) : ''}
            </div>
            <div className='SerieVideo-Video'>
                {
                    serieVideo !== null ? (
                        <YouTube opts={opts} videoId={serieVideo.key} />
                    ) : (
                        <video src={require('assets/sample_video.mp4')} controls autoPlay={true}></video>
                    )
                }
            </div>
            {/* <video src={process.env.REACT_APP_YOUTUBE_URL + serieVideo.id} controls></video> */}
        </div>
    )
}

export default SerieVideo;