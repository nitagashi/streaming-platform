import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="Header">
            <div className='Header-list'>
                <img className='Header-list__logo' src={require('images/logo.png')} alt='logo' />
                <button className='Header-list__btn'><Link to='/' >Home</Link></button>
                <button className='Header-list__btn'>Movie</button>
                <button className='Header-list__btn'>Series</button>
            </div>
        </header>
    );
}


export default Header;