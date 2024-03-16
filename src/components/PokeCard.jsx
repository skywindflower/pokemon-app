import React, { useEffect, useState } from 'react';
import { pokemonColorConvert } from '../api/dataFormat';
import axios from 'axios';
import './PokeCard.css';

const PokeCard = ({ url }) => {
  const [pokemon, setPokemon] = useState({});
  const [pokemonColor, setPokemonColor] = useState('');

  useEffect(() => {
    fetchPokeDetailData();
  }, []);

  const fetchPokeDetailData = async () => {
    try {
      const pokemonResponse = await axios.get(url);
      setPokemon(pokemonResponse.data);
      const colorResponse = await axios.get(pokemonResponse.data.species.url);
      setPokemonColor(pokemonColorConvert(colorResponse.data.color.name));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {Object.keys(pokemon).length > 0 && (
        <div className='card'>
          <p className='pokemon-id' style={{ color: `${pokemonColor}` }}>
            {`#${('0000' + pokemon.id).slice(-4)}`}
          </p>
          <img
            className='pokemon-img'
            src={pokemon.sprites.other.home.front_default}
            alt='pokemon img'
          />
          <p
            className='pokemon-name'
            style={
              pokemonColor === 'black' || pokemonColor === 'white'
                ? pokemonColor === 'black'
                  ? { color: 'white', backgroundColor: `${pokemonColor}` }
                  : { color: 'black', backgroundColor: `${pokemonColor}` }
                : { backgroundColor: `${pokemonColor}` }
            }
          >
            {pokemon.name.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
};

export default PokeCard;
