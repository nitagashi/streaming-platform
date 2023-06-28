import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

function Search() {
    return (
        <div className="Search">
            <button className="Search-Icon">
                <SearchIcon />
            </button>
            <input placeholder="search.." className="Search-Input" name="text" type="text" />
            <div className='Search-Cover'></div>
        </div>
    );
}

export default Search;