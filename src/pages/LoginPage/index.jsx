import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('pokemonAccessToken')) {
      navigate('/main');
    }
  }, []);

  return (
    <div className='login-container'>
      <img src='/img/Pokemon_logo.svg' alt='pokemon img' />
    </div>
  );
};

export default LoginPage;
