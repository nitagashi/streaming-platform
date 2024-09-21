import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import LazyLoad from 'react-lazy-load';

function SerieCard(props) {
    const { id, show, loading } = props;

    return !loading ? (
        <LazyLoad height={"100%"} width={275} threshold={0.25}>
            <div className='SerieCard'>
                <img alt='' className="SerieCard__Img" src={`${process.env.REACT_APP_ASSETS_URL}/${show.banner}`} />
                <div className="SerieCard__Title">{show.name}</div>
            </div>
        </LazyLoad>
    ) : (
        <Skeleton variant="rectangular" width={275} height={100} />
    )
}

export default SerieCard;