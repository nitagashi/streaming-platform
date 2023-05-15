import React from 'react'

function Header() {
    return (
        <header className="Header">
            <div className='Header-list'>
                <img className='Header-list__logo' src={require('images/logo.png')} alt='logo' />
                <button className='Header-list__btn'>Home</button>
                <button className='Header-list__btn'>Movie</button>
                <button className='Header-list__btn'>Series</button>
            </div>
        </header>
    );
}


export default Header;