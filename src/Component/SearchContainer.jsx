import React from 'react';
import './SearchContainer.css';

const SearchContainer = ({setQuery}) => {
  return (
    <div className="searchContainerBox">
      <div className="Search">
        <span className="searchIcon">
          <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
        </span>
        <input onChange={(e)=>setQuery(e.target.value.toLowerCase())}
          type="text"
          placeholder="Search for Country..."
          aria-label="Search for Country"
        />
      </div>
    </div>
  );
};

export default SearchContainer;
