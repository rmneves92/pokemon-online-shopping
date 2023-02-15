import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter, convertToLowerCase } from '../utils/text';
import { PokeInfo } from '../components/PokeInfo';
import { Card } from '../components/Card';

import '../index.css';

const Home = () => {
  const [pokemons, setPokemons] = useState(null);
  const [pokeInfo, setPokeInfo] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    // fetchPokemons();
    fetchAllPokemons();
  }, []);

  //   useEffect(() => {
  //     console.log('query: ', query);

  //     if (!query.toLowerCase().trim()) return;

  //     if (!query.toLowerCase().trim() === '') fetchPokemons();

  //     const getPokemons = setTimeout(() => {
  //       searchPokemons(query);
  //     }, 1000);

  //     return () => clearTimeout(getPokemons);
  //   }, [query]);

  const fetchAllPokemons = () => {
    try {
      fetch('https://pokeapi.co/api/v2/pokemon/')
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
      // const result = await Promise.all(endpoints.map((url) => fetch(url).then((res) => res.json())));

      // setPokemons(result);
    } catch (error) {
      console.error(error);
    }
  };

  const extractIdFromUrl = (url) => {
    const id = url?.match(/\/pokemon\/(\d+)/)[1];
    return id;
  };

  //   const fetchPokemons = async () => {
  //     const endpoints = [];

  //     try {
  //       for (let i = 1; i <= 20; i++) {
  //         endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
  //       }

  //       const result = await Promise.all(endpoints.map((url) => fetch(url).then((res) => res.json())));

  //       setPokemons(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const searchPokemons = (query) => {
  //     console.log('searchPokemons: ', query);
  //     try {
  //       fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log('=> data: ', data);
  //           setPokemons([data]);
  //         });
  //     } catch (error) {}
  //   };

  const handleSearch = (name) => {
    const strLowerCase = convertToLowerCase(name);

    if (!strLowerCase || strLowerCase === '') {
      fetchAllPokemons();
      setPokeInfo(null);
      return;
    }

    console.log('strLowerCase', strLowerCase);

    try {
      fetch(`https://pokeapi.co/api/v2/pokemon/${strLowerCase}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('=> data: ', data);

          setPokeInfo(data);
          //   setPokemons([]);
          //   setPokemons([data]);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // const goToDetailsScreen = (url: string): void => {
  //   navigate('/Details', { state: { url } });
  // };

  //   const handleInputChange = (value) => {

  //     setQuery(value)
  //   }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  const showPokemonDetails = (pokemonName) => {
    console.log('showPokemonDetails', pokemonName);
    handleSearch(pokemonName);
  };

  return (
    <div className="container">
      <div className="filter">
        <label htmlFor="search">Search</label>
        <input name="search" placeholder="Search by id or name..." onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
        <button onClick={() => handleSearch(query)}>Go!</button>
      </div>

      <div className="catalog">
        {!pokeInfo && pokemons ? (
          pokemons?.map((pokemon) => <Card pokemon={pokemon} showPokemonDetails={showPokemonDetails} />)
        ) : (
          <a className="back-button" onClick={() => setPokeInfo(null)}>
            &larr; back
          </a>
        )}
      </div>

      {pokeInfo && <PokeInfo pokemon={pokeInfo} />}
    </div>
  );
};

export default Home;
