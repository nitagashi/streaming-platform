import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SeriesService from 'services/SeriesServices';

function SerieCard(props) {
    const { id } = props;
    const [serie, setSerie] = useState([]);

    useEffect(() => {
        SeriesService.getSerieById(id).then((res) => {
            setSerie(res.data)
        })
    }, [])
    return serie.length != 0 ?(
        <div className='SerieCard'>
            <img className="SerieCard__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${serie.backdrop_path}`} />
            <div className="SerieCard__Title">{serie.name}</div>
        </div >
    ): (
        <Skeleton variant="rectangular" width={275} height={100} />
    )
}

export default SerieCard;