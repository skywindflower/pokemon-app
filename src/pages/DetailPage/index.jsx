import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import {
  pokemonColorConvert,
  typeColor,
  pokemonStats,
} from '../../api/dataFormat';
import './DetailPage.css';
import LoadingPage from '../LoadingPage';
import DamageModal from '../../components/DamageModal';

const DetailPage = () => {
  const url = useLocation().state.url;
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState({});
  const [pokemonSpecies, setPokemonSpecies] = useState({});
  const [pokemonColor, setPokemonColor] = useState('');
  const [pokemonDamage, setPokemonDamage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (url) {
      fetchPokeDetailData();
    }
  }, [url]);

  const fetchPokeDetailData = async () => {
    try {
      const { data: pokemonResponse } = await axios.get(url);
      setPokemon(pokemonResponse);

      const { data: colorResponse } = await axios.get(
        pokemonResponse.species.url
      );
      setPokemonSpecies(colorResponse);
      setPokemonColor(pokemonColorConvert(colorResponse.color.name));

      const damageRelations = await Promise.all(
        pokemonResponse.types.map(async (item) => {
          const type = await axios.get(item.type.url);
          return type.data.damage_relations;
        })
      );
      setPokemonDamage(damageRelations);
    } catch (error) {
      console.error(error);
    }
  };

  const handleArrowClick = (direction) => {
    const arr = url.split('/');
    const newBaseUrl = arr.slice(0, -2).join('/');
    if (direction === 'left') {
      navigate(`/${pokemon.id - 1}`, {
        state: {
          url: `${newBaseUrl}/${pokemon.id !== 1 ? pokemon.id - 1 : 1025}/`,
        },
      });
    } else {
      navigate(`/${pokemon.id + 1}`, {
        state: {
          url: `${newBaseUrl}/${pokemon.id !== 1025 ? pokemon.id + 1 : 1}/`,
        },
      });
    }
  };

  const FlavorText = () => {
    if (
      Object.keys(pokemonSpecies).length > 0 &&
      pokemonSpecies.flavor_text_entries.length > 0
    ) {
      const entries = pokemonSpecies.flavor_text_entries.filter(
        (entries) => entries.language.name === 'ko'
      );
      const randomNum = Math.floor(Math.random() * entries.length);

      return (
        <div>
          <MiddleTitle $pokemonColor={pokemonColor}>설명</MiddleTitle>
          <p style={{ color: 'white' }}>{entries[randomNum].flavor_text}</p>
        </div>
      );
    }
    return [];
  };

  return (
    <SectionContainer>
      {Object.keys(pokemon).length > 0 ? (
        <Container>
          <span
            className='material-symbols-outlined arrow'
            onClick={() => handleArrowClick('left')}
          >
            arrow_back_ios
          </span>
          <DetailContainer $pokemonColor={pokemonColor}>
            <Title>
              <FlexRow>
                <span className='material-symbols-outlined title-arrow'>
                  arrow_back
                </span>
                <p>{pokemon.name}</p>
              </FlexRow>
              <p>{`#${('0000' + pokemon.id).slice(-4)}`}</p>
            </Title>
            <Info>
              <img
                src={pokemon.sprites.other.home.front_default}
                alt='pokemon img'
                onClick={() => setIsOpen(true)}
              />
              <FlexRow>
                {pokemon.types.map((item) => {
                  const backgroundColor = typeColor(item.type.name);
                  return (
                    <Type $backgroundColor={backgroundColor} key={item.slot}>
                      {item.type.name}
                    </Type>
                  );
                })}
              </FlexRow>
              <MiddleTitle $pokemonColor={pokemonColor}>정보</MiddleTitle>
              <SmallTitleContainer>
                <div>
                  <h3>Weight</h3>
                  <p>
                    <span className='material-symbols-outlined w-h-icon'>
                      monitor_weight
                    </span>
                    {`${pokemon.weight / 10}kg`}
                  </p>
                </div>
                <div>
                  <h3>Height</h3>
                  <p>
                    <span className='material-symbols-outlined w-h-icon'>
                      height
                    </span>
                    {`${pokemon.height / 10}m`}
                  </p>
                </div>
                <div>
                  <h3>Abilities</h3>
                  <div>
                    {pokemon.abilities.map((item, index) => {
                      return <p key={index}>{item.ability.name}</p>;
                    })}
                  </div>
                </div>
              </SmallTitleContainer>
              <div style={{ width: '100%', height: '100%' }}>
                <MiddleTitle $pokemonColor={pokemonColor}>
                  기본 능력치
                </MiddleTitle>
                <StatsContainer>
                  {pokemonStats(pokemon.stats).map((stat, index) => {
                    const percent = Number(stat.baseStat / 255) * 100;
                    return (
                      <StatContainer key={index}>
                        <span style={{ flex: 1 }}>{stat.name}</span>
                        <span style={{ flex: 0.5 }}>{stat.baseStat}</span>
                        <div
                          style={{
                            flex: 3,
                            minWidth: '100px',
                            height: '0.5rem',
                            borderRadius: '25px',
                            background: `linear-gradient(to right, ${pokemonColor} ${percent}%, gray ${percent}%)`,
                            marginRight: '20px',
                          }}
                        ></div>
                        <span style={{ flex: 0.5 }}>255</span>
                      </StatContainer>
                    );
                  })}
                </StatsContainer>
              </div>
              <FlavorText />
            </Info>
            <SpritesContainer>
              {Object.keys(pokemon.sprites)
                .filter((key) => typeof pokemon.sprites[key] === 'string')
                .map((item, index) => {
                  return (
                    <img
                      key={index}
                      src={pokemon.sprites[item]}
                      alt='pokemon img'
                    />
                  );
                })}
            </SpritesContainer>
          </DetailContainer>
          <span
            className='material-symbols-outlined arrow'
            onClick={() => handleArrowClick('right')}
          >
            arrow_forward_ios
          </span>
        </Container>
      ) : (
        <LoadingPage />
      )}
      {isOpen && (
        <DamageModal damageInfo={pokemonDamage} setIsOpen={setIsOpen} />
      )}
    </SectionContainer>
  );
};

export default DetailPage;

const SectionContainer = styled.section`
  width: 100%;
  height: auto;
  min-height: calc(100vh - 60px);
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

const DetailContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background: linear-gradient(
    ${({ $pokemonColor }) => $pokemonColor} 25%,
    rgb(23, 25, 36) 25%
  );
`;

const Title = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  z-index: 2;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20%;
  z-index: 1;

  & > img {
    justify-self: center;
    width: 200px;
    height: 200px;
    margin-bottom: 25px;
  }
`;

const FlexRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Type = styled.p`
  color: black;
  padding: 5px 12px;
  border-radius: 25px;
  font-size: 0.8rem;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  margin-bottom: 25px;
`;

const MiddleTitle = styled.p`
  color: ${({ $pokemonColor }) => $pokemonColor};
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const SmallTitleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  color: white;
  font-size: 0.8rem;
  margin-bottom: 25px;
  text-align: center;

  & > div {
    margin: 5px 20px;
    > h3 {
      margin-bottom: 10px;
    }
    > p {
      font-size: 0.8rem;
      line-height
    }
  }
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

const StatContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  & > span {
    color: white;
  }
`;

const SpritesContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 7% 0 0;
`;
