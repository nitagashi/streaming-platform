import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MovieService from 'services/MovieServices';
import YouTube from 'react-youtube';

function MovieVideo() {
    const [movieVideo, setMovieVideo] = useState(null);
    const [clips, setClips] = useState(null);
    const [currentClip, setCurrentClip] = useState(1);
    const params = useParams()
    const { id } = params;
    useEffect(() => {
        MovieService.getMovieVideo(id).then((res) => {
            setMovieVideo(res.data.results[0])
            setCurrentClip(res.data.results[0].key)
            setClips(res.data.results)
        })
    }, [])

    const opts = {
        height: '500px',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };
    const changeClip = (key) => {
        setCurrentClip(key)
    }
    return movieVideo !== null ? (
        <div className='SerieVideo'>
            <div className='SerieVideo-Episodes'>
                <p className='SerieVideo-Episodes__Title'>Clips List</p>
                {clips !== null ? clips.map((clip) => {
                    if (clip.air_date !== null)
                        return (
                            <button
                                className={currentClip === clip.key ? 'SerieVideo-Episodes__Btn active' : 'SerieVideo-Episodes__Btn'}
                                onClick={() => { changeClip(clip.key) }}
                            >
                                <p className='SerieVideo-Episodes__Btn-EpName'>{clip.name}</p>
                            </button>
                        )
                    else
                        return ''
                }) : ''}
            </div>
            <div className='SerieVideo-Video'>
                {
                    movieVideo !== null ? (
                        <YouTube opts={opts} videoId={currentClip} />
                    ) : (
                        <video src={require('assets/NotAvailable.mp4')} controls autoPlay={true}></video>
                    )
                }
                <div className='SerieVideo-Video__Description'>
                    <div>
                        You are watching:
                    </div>
                    <div>
                        {movieVideo.name}
                    </div>
                </div>
            </div>
            {/* <video src={process.env.REACT_APP_YOUTUBE_URL + serieVideo.id} controls></video> */}
        </div>
    ) : (<div>Loading...</div>)
}

export default MovieVideo;