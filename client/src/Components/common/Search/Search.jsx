import React, { useState, useCallback } from 'react';
import Input from '../Input';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 300),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <Input
      id="search"
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search"
      icon={<img src="/asset/icons/search.svg" alt="Search" />}
    />  
  );
};

export default Search;

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}