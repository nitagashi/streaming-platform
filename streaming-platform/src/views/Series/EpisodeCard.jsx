import React from 'react'
import LazyLoad from 'react-lazy-load';

function EpisodeCard(props) {
    return (
        <LazyLoad height={"100%"} width={275} threshold={0.25}>
            <div className='SerieCard'>
                <img className="SerieCard__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${props.episode.still_path}`} />
                <div className="SerieCard__Title">Episode {props.episode.episode_number}: {props.episode.name}</div>
            </div>
        </LazyLoad>
    );
}

export default EpisodeCard;