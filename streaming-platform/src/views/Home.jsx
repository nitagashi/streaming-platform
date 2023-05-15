import React from 'react'

function Home() {
    return (
        <div className='Home'>
            <div className='Home-Banner'>
                <p className='Home-Banner__Welcome'>Welcome to RubyPlex</p>
                <p className='Home-Banner__Description'>
                    Discover a World of Entertainment at Your Fingertips.
                    Unlimited Movies, Shows, and More.
                    <br />
                    Start Binge-Watching Today!
                </p>
                <div className='Home-Banner__Buttons'>
                    <button>
                        Watch Now.
                    </button>
                </div>
            </div>
            <div className='Home-Latest'>

            </div>
        </div>
    );
}

export default Home;