import React, { useEffect, useState } from 'react'
import MovieService from 'services/MovieServices';

function FlipCard(props) {
    const { id } = props;
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        MovieService.getMovieById(id).then((res) => {
            console.log(res);
            setMovie(res.data)
        })
    }, [])
    return (
        <div className="FlipCard">
            <div className="FlipCard-Inner">
                <div className="FlipCard-Front">
                    <img className="FlipCard-Front__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${movie.poster_path}`} />
                    <p className="FlipCard-Front__Title">{movie.original_title}</p>
                </div>
                <div className="FlipCard-Back">
                    <img className="FlipCard-Back__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${movie.poster_path}`} />
                    <p className="FlipCard-Back__Title">{movie.original_title}</p>
                    <p className="FlipCard-Back__Description">{movie.overview}</p>
                </div>
            </div>
        </div>
    );
}

export default FlipCard;