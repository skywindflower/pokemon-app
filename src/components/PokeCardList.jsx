import React from 'react';
import { useNavigate } from 'react-router-dom';
import PokeCard from './PokeCard';
import './PokeCardList.css';

const PokeCardList = ({ displayPokemon }) => {
  const navigate = useNavigate();

  return (
    <div className='pokemon-card-list'>
      {displayPokemon.map((pokemon) => {
        return (
          <div
            key={pokemon.id}
            onClick={() =>
              navigate(`/${pokemon.id}`, { state: { url: pokemon.url } })
            }
          >
            <PokeCard key={pokemon.name} url={pokemon.url} />
          </div>
        );
      })}
    </div>
  );
};

export default PokeCardList;
