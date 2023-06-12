import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="Header">
            <div className='Header-list'>
                <img className='Header-list__logo' src={require('images/logo.png')} alt='logo' />
                <button className='Header-list__btn'><Link to='/' ><p name='Home'>Home</p></Link></button>
                <button className='Header-list__btn'><Link to='/Shows'><p name='Movie'>Movie</p></Link></button>
                <button className='Header-list__btn'><Link to='/Series'><p name='Series'>Series</p></Link></button>
            </div>
        </header>
    );
}


export default Header;