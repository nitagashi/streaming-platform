import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'views/Home';
import SerieShow from 'views/SerieShow';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' Component={Home} />
                <Route exact path='/SerieShow/:id' Component={SerieShow} />
                {/* <Route exact path='/Movie/:id' Component={SerieShow} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default Router;