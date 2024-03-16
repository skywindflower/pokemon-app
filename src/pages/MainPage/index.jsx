import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/PokeCard.jsx';
import LoadingPage from '../LoadingPage/index.jsx';
import './MainPage.css';

const MainPage = ({ allPokemon }) => {
  const navigate = useNavigate();
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
          <div className='main-pokemon-list'>
            {displayPokemon.map((pokemon) => {
              return (
                <div
                  key={pokemon.name}
                  onClick={() =>
                    navigate(`/${pokemon.id}`, { state: { url: pokemon.url } })
                  }
                >
                  <Card key={pokemon.name} url={pokemon.url} />
                </div>
              );
            })}
          </div>
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
