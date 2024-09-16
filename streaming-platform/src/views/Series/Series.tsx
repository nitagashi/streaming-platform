import { Pagination, Skeleton } from '@mui/material';
import SkeletonLoader from 'components/Loader/SkeletonLoader';
import { ShowModel } from 'models/Models.types';
import React, { useEffect, useState } from 'react'
import LazyLoad from 'react-lazy-load';
import { useNavigate } from 'react-router-dom';
import SeriesService from 'services/SeriesServices';
import { useQuery } from '@apollo/client';
import { useGetShowsQuery } from 'generated/graphql';


interface Shows {
    shows: ShowModel[]
}

function Series() {
    const [page, setPage] = useState(1);
    const [pageNr, setPageNr] = useState(1);
    const navigate = useNavigate();
    // useEffect(() => {
    //     setShows([new ShowModel()])
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    //     setTimeout(() => {
    //         SeriesService.getSeries(page).then((res) => {
    //             setShows(res.data.results);
    //         })
    //     }, 1000)
    // }, [page])

    const { loading, error, data = { shows: [new ShowModel()] } } = useGetShowsQuery();
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    const { shows } = data

    const handleChange = (event: any, value: number) => {
        setPage(value);
    };
    return (
        <div className='Shows'>
            <div className='Shows-Header'>
                <div></div>
            </div>
            <div className='ShowCard-Container'>
                {
                    shows.length != 0 ? (
                        shows.map((show) => {
                            { console.log(show) }

                            return (
                                <LazyLoad height={"100%"} width={190} threshold={0.25}>
                                    <div onClick={() => { navigate(`/SerieShow/${show.id}`) }} className="ShowCard">
                                        <img className="ShowCard-Image" src={`${process.env.REACT_APP_ASSETS_URL}/${show.banner}`} />
                                        <div className="ShowCard-Title">
                                            {show.name}
                                        </div>
                                    </div>
                                </LazyLoad>
                            )
                        })
                    )
                        : (
                            <SkeletonLoader number={20} width={190} height={270} />
                        )
                }
            </div>
            <div className='Shows-Pagination'>
                <Pagination page={page} onChange={handleChange} count={pageNr} />
            </div>
        </div>
    )
}

export default Series;