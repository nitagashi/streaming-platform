import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from 'views/Home';
import MovieShow from 'views/MovieShow';
import MovieVideo from 'views/MovieVideo';
import SerieShow from 'views/SerieShow';
import SerieVideo from 'views/SerieVideo';
import ShowVideo from 'views/SerieVideo';

function AppRoutes() {
    return (
        <Routes>
            <Route exact path='/' Component={Home} />
            <Route exact path='/SerieShow/:id' Component={SerieShow} />
            <Route exact path='/MovieShow/:id' Component={MovieShow} />
            <Route exact path='/SerieVideo/:idSerie/:seasonNr/:epNumber' Component={SerieVideo} />
            <Route exact path='/MovieVideo/:id' Component={MovieVideo} />
            {/* <Route exact path='/Movie/:id' Component={SerieShow} /> */}
        </Routes>
    );
}

export default AppRoutes;