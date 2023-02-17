import React, { useEffect, useState, useCallback, useRef } from 'react';
import { convertToLowerCase } from '../utils/text';
import { PokeInfo } from '../components/PokeInfo/PokeInfo';
import { Pagination } from '../components/Pagination/Pagination';
import { Filter } from '../components/Filter/Filter';
import { Pokedex } from '../components/Pokedex/Pokedex';
import { ItemsPerPage } from '../components/ItemsPerPage/ItemsPerPage';
import styles from './Home.module.css';

const Home = () => {
  const [pokemons, setPokemons] = useState(null);
  const [pokemonsWithAbilityFilter, setPokemonsWithAbilityFilter] = useState(null);
  const [pokeInfo, setPokeInfo] = useState(null);
  const [abilities, setAbilities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(1000);
  const [selectedAbilities, setSelectedAbilities] = useState([]);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const [showServerMessageError, setShowServerMessageError] = useState(false);

  const dataFetchedRef = useRef(false);
  const querySearchRef = useRef('');

  const paginatePokemons = useCallback(
    (array) => {
      const currentPage = offset / limit + 1;
      return array.slice((currentPage - 1) * limit, currentPage * limit);
    },
    [limit, offset]
  );

  // fetch all Pokémons based on the abilities selected and returns a single Promise
  const getPokemonsByAbility = useCallback(async (abilities) => {
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
          .catch((err) => {
            console.error(err);
          })
      )
    );

    return response;
  }, []);

  const createListOfSelectedAbilities = useCallback(() => {
    const abilities = [];
    for (let ability of selectedAbilities) {
      abilities.push(ability);
    }

    return abilities;
  }, [selectedAbilities]);

  // function responsible for concatenating all arrays of Pokemons into just one to be displayed
  const concatPokemonsList = (arr) => arr.flat(1);

  const getPokemonsWithAbilityFilter = useCallback(async () => {
    const abilities = createListOfSelectedAbilities();
    const response = await getPokemonsByAbility(abilities);
    const concatArray = concatPokemonsList(response);
    const sortedArray = sortPokemonsById(concatArray);

    if (!sortedArray.length) {
      setShowEmptyMessage(true);
      setShowServerMessageError(false);
    }

    setPokemonsWithAbilityFilter(sortedArray);

    setTotal(sortedArray.length);
  }, [createListOfSelectedAbilities, getPokemonsByAbility]);

  const getPokemons = useCallback(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setTotal(data.count);

        const pokemons = data.results.map((pokemon) => {
          return {
            name: pokemon.name,
            id: extractIdFromUrl(pokemon.url),
          };
        });

        if (!pokemons.length) {
          setShowEmptyMessage(true);
        }

        setShowEmptyMessage(false);
        setPokemons(pokemons);
      })
      .catch((err) => {
        setShowServerMessageError(true);
      });
  }, [limit, offset]);

  useEffect(() => {
    if (dataFetchedRef.current) return;

    getAbilities();
    dataFetchedRef.current = true;
  }, []);

  useEffect(() => {
    if (selectedAbilities.length === 0) {
      getPokemons();
    }
  }, [limit, offset, selectedAbilities, getPokemons]);

  useEffect(() => {
    if (selectedAbilities.length > 0) {
      const paginatedPokemons = paginatePokemons(pokemonsWithAbilityFilter);
      setPokemons(paginatedPokemons);
    }

    setPokeInfo(null);
  }, [limit, offset, selectedAbilities, pokemonsWithAbilityFilter]);

  useEffect(() => {
    getPokemonsWithAbilityFilter();
    setOffset(0);
  }, [selectedAbilities, getPokemonsWithAbilityFilter]);

  const sortPokemonsById = (array) => array.sort((a, b) => a.id - b.id);

  const getAbilities = () => {
    fetch(`https://pokeapi.co/api/v2/ability/?limit=100`)
      .then((res) => res.json())
      .then((data) => {
        setAbilities(data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const extractIdFromUrl = (url) => {
    const id = url?.match(/\/pokemon\/(\d+)/)[1];
    return id;
  };

  // function responsible for search a pokemon based on its name or id
  const handleSearchPokemon = (name) => {
    const strLowerCase = convertToLowerCase(name);

    if (!strLowerCase || strLowerCase === '') {
      getPokemons();
      setPokeInfo(null);
      setSelectedAbilities([]);
      return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${strLowerCase}`)
      .then((res) => res.json())
      .then((data) => {
        setShowServerMessageError(false);
        setShowEmptyMessage(false);
        setPokeInfo(data);
      })
      .catch((err) => {
        setShowEmptyMessage(true);
        setShowServerMessageError(false);
        setPokeInfo(null);
      });
  };

  const showPokemonDetails = (pokemonName) => {
    handleSearchPokemon(pokemonName);
  };

  const handleChangeLimit = (value) => {
    setLimit(value);
    setOffset(0);
  };

  const handleSelectAbility = (ability) => {
    if (selectedAbilities.includes(ability)) {
      removeAbilityFromFilter(ability);
      return;
    }

    setSelectedAbilities([...selectedAbilities, ability]);
  };

  const removeAbilityFromFilter = (ability) => {
    const filteredAbilities = selectedAbilities.filter((item) => item !== ability);
    setSelectedAbilities(filteredAbilities);
    setTotal(filteredAbilities.length);
    setOffset(0);
  };

  return (
    <div className={styles.container}>
      <Filter
        searchQuery={searchQuery}
        selectedAbilities={selectedAbilities}
        abilities={abilities}
        ref={querySearchRef}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearchPokemon}
        handleChangeLimit={handleChangeLimit}
        removeAbility={removeAbilityFromFilter}
        handleSelectAbility={handleSelectAbility}
      />

      {!showEmptyMessage && !showServerMessageError && (
        <div className={styles.pagination_wrap}>
          <Pagination total={total} limit={limit} setLimit={setLimit} offset={offset} setOffset={setOffset} />

          <ItemsPerPage limit={limit} offset={offset} total={total} />
        </div>
      )}

      {showEmptyMessage ? (
        <p className={styles.empty_msg}>No Pokémons found.</p>
      ) : (
        <Pokedex pokeInfo={pokeInfo} pokemons={pokemons} showPokemonDetails={showPokemonDetails} setPokeInfo={setPokeInfo} />
      )}

      {pokeInfo && <PokeInfo pokemon={pokeInfo} />}

      {showServerMessageError && <p className={styles.error_msg}>The API is currently unavailable, please try again later.</p>}
    </div>
  );
};

export default Home;
