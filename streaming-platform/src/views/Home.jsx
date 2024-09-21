import React, { useEffect, useState } from 'react'
import MovieService from 'services/MovieServices';
import FlipCard from 'components/Movies/FlipCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SerieCard from 'components/Series/SerieCard';
import { Link } from 'react-router-dom';
import { ShowModel } from 'models/Models.types';
import CreateShow from 'views/Admin/CreateShow';
import { useGetShowsQuery } from 'generated/graphql';
import CreateSeason from './Admin/CreateSeason';

function Home() {

    const { loading, error, data } = useGetShowsQuery();
    console.log(data)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    const { shows } = data

    const responsive = {
        extraSuperLargeDesktop: {
            breakpoint: { max: 2500, min: 1701 },
            items: 8
        },
        superLargeDesktop: {
            breakpoint: { max: 1700, min: 1400 },
            items: 7
        },
        desktop: {
            breakpoint: { max: 1400, min: 1151 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1150, min: 901 },
            items: 5
        },
        small_tablet: {
            breakpoint: { max: 900, min: 701 },
            items: 4
        },
        large_mobile: {
            breakpoint: { max: 700, min: 501 },
            items: 3
        },
        medium_mobile: {
            breakpoint: { max: 500, min: 401 },
            items: 2
        },
        small_mobile: {
            breakpoint: { max: 401, min: 320 },
            items: 2
        },
        extra_small_mobile: {
            breakpoint: { max: 400, min: 0 },
            items: 1
        }
    };
    const responsiveSeries = {
        extraSuperLargeDesktop: {
            breakpoint: { max: 2500, min: 1701 },
            items: 7
        },
        superLargeDesktop: {
            breakpoint: { max: 1700, min: 1375 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 1375, min: 1150 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1150, min: 850 },
            items: 3
        },
        small_tablet: {
            breakpoint: { max: 850, min: 550 },
            items: 2
        },
        small_mobile: {
            breakpoint: { max: 550, min: 0 },
            items: 1
        },
    };
    return (
        <div className='Home'>
            <div className='Home-Banner'>
                <p className='Home-Banner__Welcome'>Welcome to RubyPlex</p>
                <p className='Home-Banner__Description'>
                    Discover a World of Entertainment at Your Fingertips.
                    Unlimited Movies, Shows, and More.
                    <br />
                    Start Binge-Watching Today!
                </p>
                <div className='Home-Banner__Buttons'>
                    <a href="#series">
                        <button className='RubyButton'>
                            Watch Now.
                        </button>
                    </a>
                </div>
            </div>
            <div id="movies" className='Home-LatestMovie'>
                <div className='Home-LatestMovie-Title'>
                    <p>Trending Movies</p>
                    <div className='IconButton'>
                    <CreateShow />
                    </div>
                </div>
                <Carousel
                    swipeable={true}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={false}
                    infinite={true}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    className='Home-LatestMovie__Carousel'
                >
                    {
                        shows.map((show) => {
                            return (
                                <Link to={"/SerieShow/" + show.id}>
                                    <FlipCard id={show.id} movie={show} loading={loading} key={show.id} />
                                </Link>
                            )
                        })
                    }
                </Carousel>
            </div>
            <div className='Home-LatestMovie SeriesCardCarousel' id="series">
                <div className='Home-LatestMovie-Title'>
                    <p>Trending Series</p>
                </div>
                <Carousel
                    swipeable={true}
                    draggable={false}
                    showDots={false}
                    responsive={responsiveSeries}
                    ssr={false}
                    infinite={true}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    className='Home-LatestMovie__Carousel'
                >
                    {
                        shows.map((show) => {
                            return (
                                <Link to={"/SerieShow/" + show.id}>
                                    <SerieCard id={show.id} loading={loading} show={show} key={show.id} />
                                </Link>
                            )
                        })
                    }
                </Carousel>
            </div>
            <div className='Home-LatestMovie SeriesCardCarousel'>
                <div className='Home-LatestMovie-Title'>
                    <p>Top Rated Series</p>
                </div>
                <Carousel
                    swipeable={true}
                    draggable={false}
                    showDots={false}
                    responsive={responsiveSeries}
                    ssr={false}
                    infinite={true}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    className='Home-LatestMovie__Carousel'
                >
                    {
                        shows.map((topRatesSerie) => {
                            return (
                                <Link to={"/SerieShow/" + topRatesSerie.id}>
                                    <SerieCard id={topRatesSerie.id} show={topRatesSerie} key={topRatesSerie.id} />
                                </Link>
                            )
                        })
                    }
                </Carousel>
            </div>
        </div>
    );
}

export default Home;