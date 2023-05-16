import React, { useEffect, useState } from 'react'
import MovieService from 'services/MovieServices';
import FlipCard from 'components/Movies/FlipCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SeriesService from 'services/SeriesServices';
import SerieCard from 'components/Series/SerieCard';

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
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 10
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 7
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
    };
    const responsiveSeries = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2
        }
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
                            return <FlipCard id={movie.id} key={movie.id} />
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
                            return <SerieCard id={serie.id} key={serie.id} />
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
                            return <SerieCard id={topRatesSerie.id} key={topRatesSerie.id} />
                        })
                    }
                </Carousel>
            </div>
        </div>
    );
}

export default Home;