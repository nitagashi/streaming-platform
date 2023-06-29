import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const handleSubmit = () => {
        if(value != ''){
            navigate(`/Search/${value}`);
            setValue('')
        }
    }
    return (
        <div className="Search">
            <button className="Search-Icon" onClick={() => handleSubmit()}>
                <SearchIcon id="SearchIcon" />
            </button>
            <input placeholder="search.." value={value} onChange={(e) => setValue(e.target.value)} className="Search-Input" name="text" type="text" />
            <div className='Search-Cover'></div>
        </div>
    );
}

export default Search;