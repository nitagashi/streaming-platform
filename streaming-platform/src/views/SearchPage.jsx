import { Pagination, Skeleton } from '@mui/material';
import { useSearchShowsQuery } from 'generated/graphql';
import { useState } from 'react'
import LazyLoad from 'react-lazy-load';
import { useNavigate, useParams } from 'react-router-dom';

function SearchPage(props) {
    const { value } = useParams();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    
    const { data, loading, error } = useSearchShowsQuery({
        variables: { query: value, page },
        skip: !value,
    });

    const shows = data?.searchShows.results || [];
    const total_results = data?.searchShows.total_results || 0;
    const pageNr = data?.searchShows.total_pages || 1;

    const handleChange = (event, value) => {
        setPage(value);
    };

    return loading ? (
        <div>Loading...</div>
    ) : error ? (
        <div>Error: {error.message}</div>
    ) : (
        <div className='Shows'>
            <div className='Shows-Header'>
                <div>You searched: {value}</div>
            </div>
            <div className='ShowCard-Container'>
                {shows.length ? (
                    shows.map(show => (
                        <LazyLoad height={"100%"} width={190} threshold={0.25} key={show.id}>
                            <div onClick={() => navigate(show.media_type === "movie" ? `/MovieShow/${show.id}` : `/SerieShow/${show.id}`)} className="ShowCard">
                                <img className="ShowCard-Image" src={`${process.env.REACT_APP_ASSETS_URL}/${show.image}`} alt={show.title || show.name} />
                                <div className="ShowCard-Title">
                                    {show.title || show.name}
                                </div>
                            </div>
                        </LazyLoad>
                    ))
                ) : (
                    <h1 className='white'>No Movie or Show Found.</h1>
                )}
            </div>
            <div className='Shows-Pagination'>
                <Pagination page={page} onChange={handleChange} count={pageNr} />
            </div>
        </div>
    );
}

export default SearchPage;
