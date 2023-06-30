import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Search from './Search';
import MobileHeader from './Layout/MobileHeader';

function Header() {
    const [currentLink, setCurrentLink] = useState("");
    const [width, setWidth] = useState(window.innerWidth);
    const route = useLocation();
    const navigate = useNavigate();
    const links = [
        { name: "Home", route: "/" },
        { name: "Movie", route: "/Shows" },
        { name: "Series", route: "/Series" }
    ]
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        };
        window.addEventListener('resize', handleResize);
    }, [])
    const checkPage = (name) => {
        if (route.pathname.toLocaleLowerCase() == name.toLocaleLowerCase())
            return true;
        return false;
    }
    return (
        <header className="Header">
            <div className='Header-list'>
                {
                    width <= 800 ?
                        <MobileHeader paths={links} /> : ''
                }
                <img className='Header-list__logo' onClick={() => {navigate("/")}} src={require('images/logo.png')} alt='logo' />
                {
                    width > 800 ?
                        links.map((link) => {
                            return <button className={checkPage(link.route) ? 'Header-list__btn active' : 'Header-list__btn'}><Link to={link.route} ><p name={link.name}>{link.name}</p></Link></button>
                        }) : ''
                }
                <div className='Header-Search'>
                    <Search />
                </div>
            </div>
        </header>
    );
}


export default Header;