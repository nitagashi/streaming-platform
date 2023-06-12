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
    return (
        <div className='SerieCard'>
            <img className="SerieCard__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${serie.backdrop_path}`} />
            <div className="SerieCard__Title">{serie.name}</div>
        </div >
    );
}

export default SerieCard;