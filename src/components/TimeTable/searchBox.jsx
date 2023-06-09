import React, { useState } from 'react';

const SearchBox = ({ onSearch, onKeyDown, searchTerm }) => {
  const handleChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="relative">
      <input
        className="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white"
        type="search"
        name="search"
        placeholder="Search"
        list='subjects'
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default SearchBox;
