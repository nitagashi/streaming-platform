import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MovieService from 'services/MovieServices';
import YouTube from 'react-youtube';

function MovieVideo() {
    const [movieVideo, setMovieVideo] = useState(null);
    const params = useParams()
    const { id } = params;
    useEffect(() => {
        MovieService.getMovieVideo(id).then((res) => {
            console.log(res.data.results[0].key);
            setMovieVideo(res.data.results[0])
        })
    }, [])
    return movieVideo !== null ? (
        <div>
            <YouTube videoId={movieVideo.key}/>
        </div>
    ) : (<div></div>);
}

export default MovieVideo;