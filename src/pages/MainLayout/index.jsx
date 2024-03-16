import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBox from '../../components/SearchBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainPage from '../MainPage';
import SearchPage from '../SearchPage';
import './MainLayout.css';

const MainLayout = () => {
  const navigate = useNavigate();
  const [allPokemon, setAllPokemon] = useState([]);
  const [pokemonName, setPokemonName] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('pokemonAccessToken')) {
      navigate('/');
    } else {
      fetchAllPokemonData();
    }
  }, []);

  const fetchAllPokemonData = async () => {
    const { data: response } = await axios.get(
      'https://pokeapi.co/api/v2/pokemon/?limit=1025&offset=0'
    );
    const data = response.results;
    const all = data.map((pokemon) => {
      const arr = pokemon.url.split('/');
      return {
        id: arr[arr.length - 2],
        name: pokemon.name,
        url: pokemon.url,
      };
    });
    setAllPokemon(all);
    const nameList = data.map((pokemon) => {
      return pokemon.name;
    });
    setPokemonName(nameList);
  };

  return (
    <main className='main-layout-container'>
      <header className='main-header'>
        <SearchBox pokemonName={pokemonName} />
      </header>
      <div className='main-routes'>
        <Routes>
          <Route path='/' element={<MainPage allPokemon={allPokemon} />} />
          <Route
            path='search'
            element={<SearchPage allPokemon={allPokemon} />}
          />
        </Routes>
      </div>
    </main>
  );
};

export default MainLayout;
