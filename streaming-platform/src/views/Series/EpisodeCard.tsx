import React from 'react'
import LazyLoad from 'react-lazy-load';
import { EpisodeModel } from 'models/Models.types';

interface EpisodeCardModel {
    episode: EpisodeModel
}

const EpisodeCard = (props: EpisodeCardModel) => {
    return (
        <LazyLoad height={"100%"} width={275} threshold={0.25}>
            <div className='SerieCard'>
                <img className="SerieCard__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${props.episode.image}`} />
                <div className="SerieCard__Title">Episode {props.episode.number}: {props.episode.name}</div>
            </div>
        </LazyLoad>
    );
}

export default EpisodeCard;