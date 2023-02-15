import React, { useEffect, useState } from 'react';
import { convertToLowerCase } from '../utils/text';
import { PokeInfo } from '../components/PokeInfo';

import { Filter } from '../components/Filter';
import { Pokedex } from '../components/Pokedex';

import '../index.css';

const Home = () => {
  const [pokemons, setPokemons] = useState(null);
  const [pokeInfo, setPokeInfo] = useState(null);
  const [abilities, setAbilities] = useState([]);
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(1000);
  const [selectedAbilities, setSelectedAbilities] = useState([]);

  useEffect(() => {
    if (selectedAbilities.length > 0) {
      getPokemonsByAbility();
    } else {
      fetchAllPokemons();
    }

    getAbilities();

    setPokeInfo(null);
  }, [limit, offset, selectedAbilities]);

  const getPokemonsByAbility = async () => {
    const endpoints = [];
    try {
      for (let ability of selectedAbilities) {
        endpoints.push(`https://pokeapi.co/api/v2/ability/${ability}`);
      }

      const response = await Promise.all(
        endpoints.map((endpoint) =>
          fetch(endpoint)
            .then((res) => res.json())
            .then((data) => {
              const pokemons = data.pokemon.map((pokemon) => {
                return {
                  name: pokemon.pokemon.name,
                  id: extractIdFromUrl(pokemon.pokemon.url),
                };
              });

              return pokemons;
            })
        )
      );

      const concatArray = response.flat(1);

      const sortedArray = sortPokemonsById(concatArray);

      setPokemons(sortedArray);
      setTotal(sortedArray.length);
    } catch (error) {
      console.error(error);
    }
  };

  const sortPokemonsById = (array) => array.sort((a, b) => a.id - b.id);

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

  const getAbilities = () => {
    try {
      fetch(`https://pokeapi.co/api/v2/ability/?offset=0&limit=10`)
        .then((res) => res.json())
        .then((data) => {
          console.log('abilities: ', data);

          setAbilities(data.results);
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

  const handleSelectAbility = (ability) => {
    if (selectedAbilities.includes(ability)) {
      removeAbility(ability);
      return;
    }

    setSelectedAbilities([...selectedAbilities, ability]);
  };

  const removeAbility = (ability) => {
    console.log('=>ability', ability);
    const filteredAbilities = selectedAbilities.filter((item) => item !== ability);
    setSelectedAbilities(filteredAbilities);
  };

  return (
    <div className="container">
      <aside className="abilities-panel">
        <ul className="abilities-list">
          {abilities.map((ability) => {
            return <li onClick={() => handleSelectAbility(ability.name)}>{ability.name}</li>;
          })}
        </ul>
      </aside>

      <div className="pokedex">
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
          selectedAbilities={selectedAbilities}
          removeAbility={removeAbility}
        />

        <Pokedex pokeInfo={pokeInfo} pokemons={pokemons} showPokemonDetails={showPokemonDetails} setPokeInfo={setPokeInfo} />

        {pokeInfo && <PokeInfo pokemon={pokeInfo} />}
      </div>
    </div>
  );
};

export default Home;
