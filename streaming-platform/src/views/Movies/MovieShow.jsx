import { Chip } from '@mui/material';
import CircularProgress from 'components/Pixi/CircularProgress';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import MovieService from 'services/MovieServices';

function MovieShow() {
    const [show, setShow] = useState([]);
    const [video, setVideo] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const { id } = params;
    useEffect(() => {
        MovieService.getMovieById(params.id).then((res) => {
            console.log(res.data);
            setShow(res.data)
            console.log(res.data);
        })
        fetchMovie();
    }, [])
    const fetchMovie = () => {
        MovieService.getMovieVideo(params.id).then((res) => {
            console.log(res.data);
            setVideo(res.data)
        })
    }
    const getPercentage = (percentage) => {
        return percentage*10
    }
    return show != null ? (
        <div className="Show">
            <img className="Show-Banner" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${show.backdrop_path}`}></img>
            <div className="Show-ImageContainer">
                <img className="Show-ImageContainer__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${show.poster_path}`} alt="Show Backdrop" />
            </div>
            <div className='Show-Description'>
                <div className="Show-Description-Section">
                    <p className="Show-Description-Section__Title">{show.original_title}</p>
                    <div className="Show-Description-Section__Genres">
                        {
                            show.genres != null ? show.genres.map((genre) => {
                                return <Chip label={genre.name} size="small"></Chip>
                            })
                                : ''
                        }
                    </div>
                    <CircularProgress percentage = {getPercentage(show.vote_average)}/>
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