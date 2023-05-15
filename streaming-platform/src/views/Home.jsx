import React, { useEffect, useState } from 'react'
import MovieService from 'services/MovieServices';
import FlipCard from 'components/FlipCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Home() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        MovieService.getTrendingMovies().then((res) => {
            setMovies(res.data.results)
        })
    }, [])

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 8
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
                    <button>
                        Watch Now.
                    </button>
                </div>
            </div>
            <div className='Home-Latest'>
                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    responsive={responsive}
                    ssr={false} // means to render carousel on server-side.
                    infinite={true}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    className='Home-Latest__Carousel'
                >
                    {
                        movies.map((movie) => {
                            console.log(movie);
                            return <FlipCard id={movie.id} key={movie.id} />
                        })
                    }
                </Carousel>
            </div>
            <div className='Home-Latest'></div>
        </div>
    );
}

export default Home;