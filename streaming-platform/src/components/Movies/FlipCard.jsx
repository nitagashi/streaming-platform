import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MovieService from 'services/MovieServices';

function FlipCard(props) {
    const { id } = props;
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        MovieService.getMovieById(id).then((res) => {
            setMovie(res.data)
        })
    }, [])
    return movie.length != 0 ? (
        <div className="FlipCard">
            <div className="FlipCard-Inner">
                <div className="FlipCard-Front">
                    <div className="FlipCard-Front-Content">
                        <img className="FlipCard-Front-Content__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${movie.poster_path}`} />
                        <p className="FlipCard-Front-Content__Title">{movie.original_title}</p>
                    </div>
                </div>
                <div className="FlipCard-Back">
                    <img className="FlipCard-Back__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${movie.poster_path}`} />
                    <p className="FlipCard-Back__Title">{movie.original_title}</p>
                    <p className="FlipCard-Back__Description">{movie.overview}</p>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <Skeleton className="FlipCard" variant="rectangular" width={190} height={300} />
        </div>
    )
}

export default FlipCard;