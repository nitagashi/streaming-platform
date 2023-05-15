import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'views/Home';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' Component={Home} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;