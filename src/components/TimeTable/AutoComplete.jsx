import React, { useState, useEffect } from 'react';
import data from '../../assets/subject.json';

const Autocomplete = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
    } else {
      const newSuggestions = data.filter(
        (value) => value.subject_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(newSuggestions);
    }
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search..." />
      <ul>
        {suggestions.map((item, index) => (
          <li key={index}>{item.subject_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
