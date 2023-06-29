import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from 'views/Home';
import MovieShow from 'views/Movies/MovieShow';
import MovieVideo from 'views/Movies/MovieVideo';
import SerieShow from 'views/Series/SerieShow';
import SerieVideo from 'views/Series/SerieVideo';
import ShowVideo from 'views/Series/SerieVideo';
import Series from 'views/Series/Series';
import Shows from 'views/Movies/Shows';
import SearchPage from 'views/SearchPage';

function AppRoutes() {
    return (
        <Routes>
            <Route exact path='/' Component={Home} />
            <Route exact path='/Shows' Component={Shows} />
            <Route exact path='/Series' Component={Series} />
            <Route exact path='/SerieShow/:id' Component={SerieShow} />
            <Route exact path='/MovieShow/:id' Component={MovieShow} />
            <Route exact path='/SerieVideo/:idSerie/:seasonNr/:epNumber' Component={SerieVideo} />
            <Route exact path='/MovieVideo/:id' Component={MovieVideo} />
            <Route exact path='/Search/:value' Component={SearchPage} />
            {/* <Route exact path='/Movie/:id' Component={SerieShow} /> */}
        </Routes>
    );
}

export default AppRoutes;