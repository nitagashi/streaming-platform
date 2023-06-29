import { Pagination, Skeleton } from '@mui/material';
import SkeletonLoader from 'components/Loader/SkeletonLoader';
import React, { useEffect, useState } from 'react'
import LazyLoad from 'react-lazy-load';
import { useNavigate, useParams } from 'react-router-dom';
import MovieService from 'services/MovieServices';
import SeriesService from 'services/SeriesServices';

function SearchPage(props) {
    const [shows, setShows] = useState([]);
    const [total_results, setTotal_results] = useState([]);
    const [page, setPage] = useState(1);
    const [pageNr, setPageNr] = useState(1);
    const numberOfShowDisplayed = 20;
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
        SeriesService.search(params.value, page).then((res) => {
            console.log(res);
            setPageNr(res.data.total_pages)
            setShows(res.data.results);
            setTotal_results(res.data.total_results)
        });
        // MovieService.getMovies(page).then((res) => {
        //     console.log(res.data);
        //     setPageNr(res.data.total_pages)
        //     setShows(res.data.results);
        // })
    }, [])
    useEffect(() => {
        setShows([])
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            SeriesService.search(params.value, page).then((res) => {
                console.log(res);
                setPageNr(res.data.total_pages)
                setShows(res.data.results);
                setTotal_results(res.data.total_results)
            });
        }, 1000);
    }, [page])
    useEffect(() => {
        setShows([])
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            SeriesService.search(params.value, page).then((res) => {
                console.log(res);
                setPageNr(res.data.total_pages)
                setShows(res.data.results);
                setTotal_results(res.data.total_results)
            });
        }, 1000);
    }, [params.value])
    const handleChange = (event, value) => {
        setPage(value);
    };
    return shows != null ? (
        <div className='Shows'>
            <div className='Shows-Header'>
                <div>You searched: {params.value}</div>
            </div>
            <div className='ShowCard-Container'>
                {
                    shows.length != 0 ? (
                        shows.map((show) => {
                            return (
                                <LazyLoad height={"100%"} width={190} threshold={0.25}>
                                    {
                                        show.media_type == "movie" ? (
                                            <div onClick={() => { navigate(`/MovieShow/${show.id}`) }} className="ShowCard">
                                                <img className="ShowCard-Image" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${show.poster_path}`} />
                                                <div className="ShowCard-Title">
                                                    {show.title}
                                                </div>
                                            </div>
                                        ) : (
                                            <div onClick={() => { navigate(`/SerieShow/${show.id}`) }} className="ShowCard">
                                                <img className="ShowCard-Image" src={`${process.env.REACT_APP_API_MOVIEDB_IMAGE_URL}${show.poster_path}`} />
                                                <div className="ShowCard-Title">
                                                    {show.name}
                                                </div>
                                            </div>
                                        )

                                    }

                                </LazyLoad>
                            )
                        })
                    )
                        :
                        total_results == 0 ? (
                            <h1 className='white'>No Movie or Show Found.</h1>
                        ) :
                            (
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

export default SearchPage;