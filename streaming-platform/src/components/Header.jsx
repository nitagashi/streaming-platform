import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="Header">
            <div className='Header-list'>
                <img className='Header-list__logo' src={require('images/logo.png')} alt='logo' />
                <button className='Header-list__btn'><Link to='/' ><p name='Home'>Home</p></Link></button>
                <button className='Header-list__btn'><p name='Movie'>Movie</p></button>
                <button className='Header-list__btn'><p name='Series'>Series</p></button>
            </div>
        </header>
    );
}


export default Header;