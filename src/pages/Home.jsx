import React, { useEffect, useState } from 'react';
import { convertToLowerCase } from '../utils/text';
import { PokeInfo } from '../components/PokeInfo';

import { Filter } from '../components/Filter';
import { Pokedex } from '../components/Pokedex';

import '../index.css';

const Home = () => {
  const [pokemons, setPokemons] = useState(null);
  const [pokeInfo, setPokeInfo] = useState(null);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(100);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(1000);

  useEffect(() => {
    fetchAllPokemons();
  }, [limit, offset]);

  const fetchAllPokemons = () => {
    try {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then((res) => res.json())
        .then((data) => {
          const pokemons = data.results.map((pokemon) => {
            return {
              name: pokemon.name,
              id: extractIdFromUrl(pokemon.url),
            };
          });

          setPokemons(pokemons);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const extractIdFromUrl = (url) => {
    const id = url?.match(/\/pokemon\/(\d+)/)[1];
    return id;
  };

  const handleSearch = (name) => {
    const strLowerCase = convertToLowerCase(name);

    if (!strLowerCase || strLowerCase === '') {
      fetchAllPokemons();
      setPokeInfo(null);
      return;
    }

    try {
      fetch(`https://pokeapi.co/api/v2/pokemon/${strLowerCase}`)
        .then((res) => res.json())
        .then((data) => {
          setPokeInfo(data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  const showPokemonDetails = (pokemonName) => {
    handleSearch(pokemonName);
  };

  const limitOptions = [10, 20, 30, 40, 50];

  const from = Math.min(offset + 1, total);
  const to = Math.min(offset + limit, total);

  const handleChangeLimit = (e) => {
    const option = e.target.value;
    setLimit(option);
    setOffset(0);
  };

  return (
    <div className="container">
      <Filter
        query={query}
        setQuery={setQuery}
        handleKeyDown={handleKeyDown}
        handleSearch={handleSearch}
        total={total}
        limit={limit}
        setLimit={setLimit}
        offset={offset}
        setOffset={setOffset}
        from={from}
        to={to}
        limitOptions={limitOptions}
        handleChangeLimit={handleChangeLimit}
      />

      <Pokedex pokeInfo={pokeInfo} pokemons={pokemons} showPokemonDetails={showPokemonDetails} setPokeInfo={setPokeInfo} />

      {pokeInfo && <PokeInfo pokemon={pokeInfo} />}
    </div>
  );
};

export default Home;
