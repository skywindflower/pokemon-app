import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchPage.css';
import PokeCardList from '../../components/PokeCardList.jsx';

const SearchPage = ({ allPokemon }) => {
  const [searchResults, setSearchResults] = useState([]);

  const query = new URLSearchParams(useLocation().search);
  const searchText = query.get('q');

  useEffect(() => {
    if (allPokemon.length > 0) {
      fetchSearchPokemon();
    }
  }, [allPokemon, searchText]);

  const fetchSearchPokemon = () => {
    try {
      const searchPokemon = allPokemon
        .filter((pokemon) => pokemon.name.includes(searchText.toLowerCase()))
        .map((pokemon) => {
          const arr = pokemon.url.split('/');
          return {
            id: arr[arr.length - 2],
            name: pokemon.name,
            url: pokemon.url,
          };
        });
      setSearchResults(searchPokemon);
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log(searchResults);

  return (
    <section className='search-page-container'>
      {searchResults.length > 0 ? (
        <PokeCardList displayPokemon={searchResults} />
      ) : (
        <div>
          <p>찾고자하는 검색어 "{searchText}" 에 맞는 포켓몬이 없습니다.</p>
        </div>
      )}
    </section>
  );
};

export default SearchPage;
