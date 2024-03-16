import React, { useState, useEffect } from 'react';
import LoadingPage from '../LoadingPage/index.jsx';
import './MainPage.css';
import PokeCardList from '../../components/PokeCardList.jsx';

const MainPage = ({ allPokemon }) => {
  const [offset, setOffset] = useState(0);
  const [displayPokemon, setDisplayPokemon] = useState([]);

  useEffect(() => {
    if (allPokemon.length > 0) {
      getDisplayPokemonData();
    }
  }, [allPokemon]);

  const getDisplayPokemonData = () => {
    const newData = allPokemon.slice(offset, offset + 30);
    setDisplayPokemon([...displayPokemon, ...newData]);
    setOffset(offset + 30);
  };

  return (
    <div className='main-container'>
      {displayPokemon.length ? (
        <div className='main-pokemon-list-container'>
          <PokeCardList displayPokemon={displayPokemon} />
          <button
            className='pokemon-add-btn'
            onClick={() => getDisplayPokemonData(allPokemon)}
          >
            더보기
          </button>
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default MainPage;
