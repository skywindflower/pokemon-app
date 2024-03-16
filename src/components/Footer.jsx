import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer-container'>
      <div>
        <div className='link-container'>
          <img
            className='title'
            src='/img/Pokemon_logo.svg'
            alt='Disney icon'
          />
          <div className='content'>
            <a className='link' href='https://pokemonkorea.co.kr/pokedex'>
              포켓몬 도감
            </a>
            <a className='link' href='https://pokemonkorea.co.kr/game'>
              게임
            </a>
            <a className='link' href='https://pokemonkorea.co.kr/news'>
              소식
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
