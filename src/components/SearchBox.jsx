import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBox.css';
import { useEffect } from 'react';

const SearchBox = ({ pokemonName }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [isOption, setIsOption] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.className === 'search-hint-option') {
        setSearchValue(event.target.textContent);
      }
      setIsOption(false);
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleChange = (e) => {
    setIsOption(true);
    setSearchValue(e.target.value);
  };

  const isOptionBox = () => {
    const optionList = pokemonName
      .filter((name) => name.includes(searchValue.toLowerCase()))
      .map((name) => (
        <li key={name} className='search-hint-option'>
          {name}
        </li>
      ));

    if (
      optionList.length === 0 ||
      (optionList.length === 1 && optionList[0].props.children === searchValue)
    ) {
      return [];
    }

    return <ul className='search-hint-list'>{optionList}</ul>;
  };

  const handleBtnClick = () => {
    if (searchValue) {
      navigate(`/main/search?q=${searchValue}`);
    }
    setIsOption(false);
  };

  return (
    <div className='search-container'>
      <div className='search-box'>
        <input
          type='text'
          onChange={handleChange}
          value={searchValue}
          className='search-input'
        />
        <button onClick={handleBtnClick} className='search-btn'>
          검색
        </button>
      </div>
      <div className='search-option'>
        {isOption ? searchValue.length > 0 && isOptionBox() : []}
      </div>
    </div>
  );
};

export default SearchBox;
