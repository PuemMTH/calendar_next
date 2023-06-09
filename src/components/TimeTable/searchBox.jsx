import React, { useState } from 'react';

const SearchBox = ({ onSearch, onKeyDown, searchTerm }) => {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="relative">
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none"
        type="search"
        name="search"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default SearchBox;
