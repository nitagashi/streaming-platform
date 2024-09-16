import React from 'react'
import LazyLoad from 'react-lazy-load';
import { EpisodeModel } from 'models/Models.types';
import { Episode } from 'generated/graphql';

interface P {
    episode: Episode
}

const EpisodeCard = (props: P) => {
    const { episode } = props
    return (
        <LazyLoad height={"100%"} width={275} threshold={0.25}>
            <div className='SerieCard'>
                <img className="SerieCard__Img" src={`${process.env.REACT_APP_ASSETS_URL}/${episode.image}`} />
                <div className="SerieCard__Title">Episode {episode.number}: {episode.name}</div>
            </div>
        </LazyLoad>
    );
}

export default EpisodeCard;