import React, { useEffect, useState } from 'react';
import { convertToLowerCase } from '../utils/text';
import { PokeInfo } from '../components/PokeInfo';
import { Pagination } from '../components/Pagination';
import { Filter } from '../components/Filter';
import { Pokedex } from '../components/Pokedex';
import styles from './Home.module.css';

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
      // setOffset(0);
      getPokemonsByAbility();
    } else {
      fetchAllPokemons();
    }

    getAbilities();

    setPokeInfo(null);
  }, [limit, offset, selectedAbilities]);

  useEffect(() => {
    setOffset(0);
  }, [selectedAbilities]);

  const getPokemonsByAbility = async () => {
    const abilities = [];
    try {
      for (let ability of selectedAbilities) {
        abilities.push(ability);
      }

      const response = await Promise.all(
        abilities.map((ability) =>
          fetch(`https://pokeapi.co/api/v2/ability/${ability}`)
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

      const paginatedPokemons = paginatePokemons(sortedArray);

      setPokemons(paginatedPokemons);
      setTotal(sortedArray.length);
    } catch (error) {
      console.error(error);
    }
  };

  const paginatePokemons = (array) => {
    const currentPage = offset / limit + 1;
    return array.slice((currentPage - 1) * limit, currentPage * limit);
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
          setTotal(1000);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const getAbilities = () => {
    try {
      fetch(`https://pokeapi.co/api/v2/ability`)
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
      setSelectedAbilities([]);
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

  const handleChangeLimit = (value) => {
    setLimit(value);
    setOffset(0);
  };

  const handleSelectAbility = (ability) => {
    if (selectedAbilities.includes(ability)) {
      removeAbility(ability);
      // setOffset(0);
      return;
    }

    // setOffset(0);
    setSelectedAbilities([...selectedAbilities, ability]);
  };

  const removeAbility = (ability) => {
    const filteredAbilities = selectedAbilities.filter((item) => item !== ability);
    setSelectedAbilities(filteredAbilities);
    setTotal(filteredAbilities.length);
    setOffset(0);
  };

  return (
    <div className={styles.container}>
      <Filter
        query={query}
        setQuery={setQuery}
        handleKeyDown={handleKeyDown}
        handleSearch={handleSearch}
        limitOptions={limitOptions}
        handleChangeLimit={handleChangeLimit}
        selectedAbilities={selectedAbilities}
        removeAbility={removeAbility}
        handleSelectAbility={handleSelectAbility}
        abilities={abilities}
      />

      <div className={styles.pagination_wrap}>
        <Pagination total={total} limit={limit} setLimit={setLimit} offset={offset} setOffset={setOffset} />

        <p className={styles.total_items}>
          Showing {from} to {to} of {total} items
        </p>
      </div>

      <Pokedex pokeInfo={pokeInfo} pokemons={pokemons} showPokemonDetails={showPokemonDetails} setPokeInfo={setPokeInfo} />

      {pokeInfo && <PokeInfo pokemon={pokeInfo} />}
    </div>
  );
};

export default Home;
