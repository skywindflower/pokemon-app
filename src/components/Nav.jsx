import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const accessToken = localStorage.getItem('pokemonAccessToken')
  ? JSON.parse(localStorage.getItem('pokemonAccessToken'))
  : '';

const Nav = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(accessToken.token);
  const [profile, setProfile] = useState({});

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const token = tokenResponse.access_token;
      localStorage.setItem(
        'pokemonAccessToken',
        JSON.stringify({ token: token })
      );
      setUser(token);
      navigate('/main');
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  const logOut = () => {
    googleLogout();
    localStorage.clear();
    setUser('');
    setProfile({});
  };

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user}`,
          {
            headers: {
              Authorization: `Bearer ${user}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          if (
            err.response.status === 401 &&
            err.response.data.error.status === 'UNAUTHENTICATED'
          ) {
            console.log('axiox err : ', err, ' -> 토큰 만료로 인한 401 오류');
            logOut();
            window.location.reload();
          }
        });
    }
  }, [user]);

  return (
    <div className={`nav ${user && 'nav__sticky'}`}>
      <img
        className='logo'
        src='/img/Pokemon_logo.svg'
        alt='pokemon logo'
        onClick={() => (window.location.href = '/')}
      />

      {Object.keys(profile).length ? (
        <div className='dropdown'>
          <img src={profile.picture} alt='user' />
          <div className='dropdown-options'>
            <a href='/' onClick={logOut}>
              Sign out
            </a>
          </div>
        </div>
      ) : (
        <button className='login' onClick={login}>
          Sign in
        </button>
      )}
    </div>
  );
};

export default Nav;
