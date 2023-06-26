import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MovieService from 'services/MovieServices';

function Shows() {
    const [shows, setShows] = useState(null);
    const [page, setPage] = useState(1);
    const [pageNr, setPageNr] = useState(1);
    const navigate = useNavigate();
    useEffect(() => {
        MovieService.getMovies(page).then((res) => {
            console.log(res.data);
            setPageNr(res.data.total_pages)
            setShows(res.data.results);
        })
    }, [])
    useEffect(() => {
        setShows(null)
        MovieService.getMovies(page).then((res) => {
            setShows(res.data.results);
        })
    }, [page])
    const handleChange = (event, value) => {
        setPage(value);
    };
    return shows != null ? (
        <div className='Shows'>
            <div className='Shows-Header'>
                <div>Movies</div>
            </div>
            <div className='ShowCard-Container'>
                {
                    shows.map((show) => {
                        return (
                            <div onClick={() => { navigate(`/MovieShow/${show.id}`) }} className="ShowCard">
                                <img className="ShowCard-Image" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${show.poster_path}`} />
                                <div className="ShowCard-Title">
                                    {show.title}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='Shows-Pagination'>
                <Pagination page={page} onChange={handleChange} count={pageNr} />
            </div>
        </div>
    ) : (<div>Loading...</div>)
}

export default Shows;