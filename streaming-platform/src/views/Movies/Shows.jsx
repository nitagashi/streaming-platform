import { Pagination, Skeleton } from '@mui/material';
import SkeletonLoader from 'components/Loader/SkeletonLoader';
import React, { useEffect, useState } from 'react'
import LazyLoad from 'react-lazy-load';
import { useNavigate } from 'react-router-dom';
import MovieService from 'services/MovieServices';

function Shows() {
    const [shows, setShows] = useState([]);
    const [page, setPage] = useState(1);
    const [pageNr, setPageNr] = useState(1);
    const numberOfShowDisplayed = 20;
    const navigate = useNavigate();
    useEffect(() => {
        MovieService.getMovies(page).then((res) => {
            console.log(res.data);
            setPageNr(res.data.total_pages)
            setShows(res.data.results);
        })
    }, [])
    useEffect(() => {
        setShows([])
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            MovieService.getMovies(page).then((res) => {
                setShows(res.data.results);
            })
        }, 1000);
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
                    shows.length != 0 ? (
                        shows.map((show) => {
                            return (
                                <LazyLoad height={"100%"} width={190} threshold={0.25}>
                                    <div onClick={() => { navigate(`/MovieShow/${show.id}`) }} className="ShowCard">
                                        <img className="ShowCard-Image" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${show.poster_path}`} />
                                        <div className="ShowCard-Title">
                                            {show.title}
                                        </div>
                                    </div>
                                </LazyLoad>
                            )
                        })
                    ) : (
                        <SkeletonLoader number={20} width={190} height={270} />
                    )
                }
            </div>
            <div className='Shows-Pagination'>
                <Pagination page={page} onChange={handleChange} count={pageNr} />
            </div>
        </div>
    ) : (<div>Loading...</div>)
}

export default Shows;