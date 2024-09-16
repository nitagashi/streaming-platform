import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import LazyLoad from 'react-lazy-load';
import MovieService from 'services/MovieServices';

function FlipCard(props) {
    const { id, movie } = props;
    console.log(movie)
    return movie.length != 0 ? (
        <LazyLoad height={"100%"} width={190} threshold={0.25}>
            <div className="FlipCard">
                <div className="FlipCard-Inner">
                    <div className="FlipCard-Front">
                        <div className="FlipCard-Front-Content">
                            <img className="FlipCard-Front-Content__Img" src={`${process.env.REACT_APP_ASSETS_URL}/${movie.image}`} />
                            <p className="FlipCard-Front-Content__Title">{movie.name}</p>
                        </div>
                    </div>
                    <div className="FlipCard-Back">
                        <img className="FlipCard-Back__Img" src={`${process.env.REACT_APP_ASSETS_URL}/${movie.image}`} />
                        <p className="FlipCard-Back__Title">{movie.name}</p>
                        <p className="FlipCard-Back__Description">{movie.overview}</p>
                    </div>
                </div>
            </div>
        </LazyLoad>
    ) : (
        <div>
            <Skeleton className="FlipCard" variant="rectangular" width={190} height={300} />
        </div>
    )
}

export default FlipCard;