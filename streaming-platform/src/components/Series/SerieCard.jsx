import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import LazyLoad from 'react-lazy-load';
import SeriesService from 'services/SeriesServices';

function SerieCard(props) {
    const { id, show, loading } = props;
    // const [serie, setSerie] = useState([]);

    // useEffect(() => {
    //     SeriesService.getSerieById(id).then((res) => {
    //         setSerie(res.data)
    //     })
    // }, [])
    return !loading ? (
        <LazyLoad height={"100%"} width={275} threshold={0.25}>
            <div className='SerieCard'>
                <img className="SerieCard__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${show.backdrop_path}`} />
                <div className="SerieCard__Title">{show.name}</div>
            </div>
        </LazyLoad>
    ) : (
        <Skeleton variant="rectangular" width={275} height={100} />
    )
}

export default SerieCard;