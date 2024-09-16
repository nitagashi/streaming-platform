import { Chip } from '@mui/material';
import CircularProgress from 'components/Pixi/CircularProgress';
import StarsRating from 'components/Pixi/StarsRating';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import MovieService from 'services/MovieServices';

function MovieShow() {
    const [show, setShow] = useState([]);
    const [video, setVideo] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const { id } = params;
    // useEffect(() => {
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    //     MovieService.getMovieById(params.id).then((res) => {
    //         setShow(res.data)
    //     })
    //     fetchMovie();
    // }, [])
    // const fetchMovie = () => {
    //     MovieService.getMovieVideo(params.id).then((res) => {
    //         console.log(res.data);
    //         setVideo(res.data)
    //     })
    // }
    const getPercentage = (percentage) => {
        return Math.round(percentage * 10)
    }
    const handleStarChange = (value) => {
        console.log(value);
    }
    return show != null ? (
        <div className="Show">
            <div className='Show-Description'>
                <img className="Show-Banner Movie-Poster" src={`${process.env.REACT_APP_ASSETS_URL}/${show.banner}`}></img>
                <div className="Show-ImageContainer">
                    <img className="Show-ImageContainer__Img" src={`${process.env.REACT_APP_ASSETS_URL}/${show.banner}`} alt="Show Backdrop" />
                    <div>
                        <StarsRating onChange={handleStarChange}/>
                    </div>
                </div>
                <div className="Show-Description-Section">
                    <p className="Show-Description-Section-Titles__Title">{show.name}</p>
                    <div className="Show-Description-Section__Genres">
                        {
                            show.genres != null ? show.genres.map((genre) => {
                                return <Chip label={genre.name} size="small"></Chip>
                            })
                                : ''
                        }
                    </div>
                    <CircularProgress percentage={getPercentage(show.vote_average)} />
                    <div>
                        <b>Description:</b><br />
                    </div>
                    {show.overview}
                    <div className="Show-Description-Section__WatchNow">
                        <div onClick={() => { navigate(`/MovieVideo/${id}`) }}>
                            <button className='RubyButton'>
                                Watch Now.
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (<div>Loading...</div>);
}

export default MovieShow;