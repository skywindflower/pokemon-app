export const pokemonColorConvert = (color) => {
  const pokemonColors = {
    black: '#1a1a1a',
    blue: '#6390F0',
    brown: '#b83e3a',
    gray: '#B7B7CE',
    green: '#A6B91A',
    pink: '#D685AD',
    purple: '#A33EA1',
    red: '#ee4030',
    white: '#dedede',
    yellow: '#e8a725',
  };

  return pokemonColors[`${color}`];
};

export const typeColor = (type) => {
  const typeColors = {
    primary: '#ffcb05',
    second: '#3d7dca',
    third: '#003a70',
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#dfbc30',
    grass: '#7AC74C',
    ice: '#97d4d2',
    fighting: '#b83e3a',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
    none: '#BfBfBf',
  };

  return typeColors[`${type}`];
};

export const pokemonStats = ([
  statHP,
  statAttack,
  statDEP,
  statSATK,
  statSDEP,
  statSPD,
]) => [
  { name: 'Hit Points', baseStat: statHP.base_stat },
  { name: 'Attack', baseStat: statAttack.base_stat },
  { name: 'Defense', baseStat: statDEP.base_stat },
  { name: 'Special Attack', baseStat: statSATK.base_stat },
  { name: 'Special Defense', baseStat: statSDEP.base_stat },
  { name: 'Speed', baseStat: statSPD.base_stat },
];
