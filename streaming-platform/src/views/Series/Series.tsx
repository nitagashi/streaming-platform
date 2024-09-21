import { Pagination } from '@mui/material';
import SkeletonLoader from 'components/Loader/SkeletonLoader';
import { ShowModel } from 'models/Models.types';
import React, { useState } from 'react';
import LazyLoad from 'react-lazy-load';
import { useNavigate } from 'react-router-dom';
import { useGetShowsQuery } from 'generated/graphql';

function Series() {
  const [page, setPage] = useState(1);
  const showsPerPage = 15; 
  const navigate = useNavigate();

  const { loading, error, data = { shows: [new ShowModel()] } } = useGetShowsQuery();

  if (loading) return <SkeletonLoader number={20} width={190} height={270} />;
  if (error) return <p>Error: {error.message}</p>;

  const { shows } = data;

  const totalPages = Math.ceil(shows.length / showsPerPage);

  const paginatedShows = shows.slice((page - 1) * showsPerPage, page * showsPerPage);

  const handleChange = (event: any, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="Shows">
      <div className="Shows-Header">
        <div></div>
      </div>
      <div className="ShowCard-Container">
        {paginatedShows.length !== 0 ? (
          paginatedShows.map((show) => (
            <LazyLoad key={show.id} height={"100%"} width={190} threshold={0.25}>
              <div
                onClick={() => navigate(`/SerieShow/${show.id}`)}
                className="ShowCard"
              >
                <img
                  className="ShowCard-Image"
                  src={`${process.env.REACT_APP_ASSETS_URL}/${show.image}`}
                  alt={show.name}
                />
                <div className="ShowCard-Title">{show.name}</div>
              </div>
            </LazyLoad>
          ))
        ) : (
          <SkeletonLoader number={20} width={190} height={270} />
        )}
      </div>
      <div className="Shows-Pagination">
        <Pagination
          page={page}
          onChange={handleChange}
          count={totalPages}
          color="primary"
        />
      </div>
    </div>
  );
}

export default Series;
