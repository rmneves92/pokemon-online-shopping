import React, { useEffect, useState, useRef } from 'react';
// import '../App.css';
import { useLocation } from 'react-router-dom';

import '../index.css';

const Details = () => {
  // const location = useLocation();
  const [pokemon, setPokemon] = useState({});
  const dataFetchedRef = useRef(false);

  let { state } = useLocation();

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchPokemon();
  }, []);

  const fetchPokemon = () => {
    try {
      fetch(`https://pokeapi.co/api/v2/pokemon/${state.name}`)
        .then((res) => res.json())
        .then((data) => setPokemon(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {pokemon ? (
        <div>
          <p>{pokemon.name}</p>
          <img alt={pokemon.name} src={pokemon.sprites?.front_default} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Details;
