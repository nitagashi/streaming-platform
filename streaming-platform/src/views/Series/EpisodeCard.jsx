import React from 'react'

function EpisodeCard(props) {
    return (
        <div className='SerieCard'>
            <img className="SerieCard__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${props.episode.still_path}`} />
            <div className="SerieCard__Title">Episode {props.episode.episode_number}: {props.episode.name}</div>
        </div>
    );
}

export default EpisodeCard;