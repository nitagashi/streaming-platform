import React, { useEffect, useState } from 'react'
import MovieService from 'services/MovieServices';
import FlipCard from 'components/Movies/FlipCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SeriesService from 'services/SeriesServices';
import SerieCard from 'components/Series/SerieCard';
import { Link } from 'react-router-dom';

function Home() {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [topRatesSeries, setTopRatesSeries] = useState([]);
    useEffect(() => {
        MovieService.getTrendingMovies().then((res) => {
            setMovies(res.data.results)
        })
        SeriesService.getTrendingSeries().then((res) => {
            setSeries(res.data.results)
        })
        SeriesService.getTopRated().then((res) => {
            setTopRatesSeries(res.data.results)
        })
    }, [])

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
                    <a href="#movies">
                        <button>
                            Watch Now.
                        </button>
                    </a>
                </div>
            </div>
            <div id="movies" className='Home-LatestMovie'>
                <p className='Home-LatestMovie__Title'>Trending Movies</p>
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
                        movies.map((movie) => {
                            console.log(movie);
                            return (
                                <Link to={"/MovieShow/" + movie.id}>
                                    <FlipCard id={movie.id} key={movie.id} />
                                </Link>
                            )
                        })
                    }
                </Carousel>
            </div>
            <div className='Home-LatestMovie SeriesCardCarousel'>
                <p className='Home-LatestMovie__Title'>Trending Series</p>
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
                        series.map((serie) => {
                            return (
                                <Link to={"/SerieShow/" + serie.id}>
                                    <SerieCard id={serie.id} key={serie.id} />
                                </Link>
                            )
                        })
                    }
                </Carousel>
            </div>
            <div className='Home-LatestMovie SeriesCardCarousel'>
                <p className='Home-LatestMovie__Title'>Top Rated Series</p>
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
                        topRatesSeries.map((topRatesSerie) => {
                            return (
                                <Link to={"/SerieShow/" + topRatesSerie.id}>
                                    <SerieCard id={topRatesSerie.id} key={topRatesSerie.id} />
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