import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Search from './Search';

function Header() {
    const [currentLink, setCurrentLink] = useState("");
    const route = useLocation();
    const links = [
        {name: "Home", route:"/"},
        {name: "Movie", route:"/Shows"},
        {name: "Series", route:"/Series"}
    ]
    const checkPage = (name) => {
        console.log(route.pathname.toLocaleLowerCase() == name.toLocaleLowerCase());
        if(route.pathname.toLocaleLowerCase() == name.toLocaleLowerCase())
            return true;
        return false;
    }
    return (
        <header className="Header">
            <div className='Header-list'>
                <img className='Header-list__logo' src={require('images/logo.png')} alt='logo' />
                {
                    links.map((link) => {
                        return <button className={checkPage(link.route) ? 'Header-list__btn active' : 'Header-list__btn'}><Link to={link.route} ><p name={link.name}>{link.name}</p></Link></button>
                    })
                }
            <div className='Header-Search'>
                <Search />
            </div>
            </div>
        </header>
    );
}


export default Header;