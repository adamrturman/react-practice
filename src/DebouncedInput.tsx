import reactLogo from './assets/react.svg';
import { type ChangeEvent, useEffect, useState } from 'react';
import useDebouncedValue from './hooks/useDebouncedValue';

const BASE_URL = 'https://pokeapi.co/api/v2/';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}
export default function DebouncedInput() {
  const [inputValue, setInputValue] = useState('');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const debouncedInputValue = useDebouncedValue(inputValue);

  useEffect(() => {
    const controller = new AbortController();

    const getPokemon = async () => {
      try {
        const res = await fetch(`${BASE_URL}/pokemon/${debouncedInputValue}`, {
          signal: controller.signal
        })
        const pokemon = await res.json();
        setPokemon(pokemon);
      } catch {
        console.log('Oops');
      }
    }

    //  don't fetch invalid if user clears the input
    if (debouncedInputValue.trim().length !== 0) {
      void getPokemon();
    }

    return () => controller.abort();

  }, [debouncedInputValue]);


  return (
    <>
      <input onChange={handleChange} value={inputValue} />
      <p>Debounced value: {debouncedInputValue}</p>
      {/*The picture element allows us to define multiple sources */}
      {/*so the browser can render the appropriately-sized image*/}
      {/*We must provide a fallback generic img tag as well*/}
      {pokemon?.sprites && <picture>
        <source srcSet={pokemon.sprites.back_default} media="(width > 400px)"/>
        <source srcSet={pokemon.sprites.front_default} media="(width <= 400px)"/>
        <img src={reactLogo} alt="React Logo"/>
      </picture>
      }
    </>
  )
}
