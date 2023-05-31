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
    return (
        <div className="Show">
            <div className="Show-ImageContainer">
                <img className="Show-ImageContainer__Img" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${show.poster_path}`} alt="Show Backdrop" />
            </div>
            <div className='Show-Description'>
                <div className="Show-Description-Section">
                    <p><b>Name:</b> {show.original_title}</p>
                    <p><b>Status:</b> {show.status}</p>
                    <p><b>Airing Date:</b> {show.release_date}</p>
                    <p><b>Episodes:</b> {show.number_of_episodes}</p>
                </div>
                <div className="Show-Description-Section">
                    <div className="Show-Description-Section__Title">
                        <b>Genres:</b>
                    </div>
                    {show.genres != null ? show.genres.map((genre) => genre.name).join(', ') : ''}
                </div>
                <div className="Show-Description-Section">
                    <div className="Show-Description-Section__Title">
                        <b>Overview:</b><br />
                    </div>
                    {show.overview}
                </div>
                <div className="Show-Description-Section">
                    <div className="Show-Description-Section__Title">
                        <b>Movie:</b>
                    </div>
                    <div className="Show-Description-Section--BtnContainer">
                        <button className="Show-Description-Section__Btn" onClick={() => {navigate(`/MovieVideo/${id}`)}}>Movie</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieShow;