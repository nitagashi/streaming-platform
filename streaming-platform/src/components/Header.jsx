import React from 'react'

function Header() {
    return (
        <header className="header">
            <div className='header-list'>
                <img className='header-list__logo' src={require('images/logo.png')} alt='logo' />
                <button className='header-list__btn'>Home</button>
                <button className='header-list__btn'>Movie</button>
                <button className='header-list__btn'>Series</button>
            </div>
        </header>
    );
}


export default Header;