import { useEffect, useState } from 'react';

const BASE_URL = 'https://pokeapi.co/api/v2/';

export default function Pokemon() {
  const [id, setId] = useState(1);
  const [name, setName] = useState('');

  //  use an effect to track changes to the id and reach out to API with that ID
  //  If a new request comes in before the previous has finishes, abort it and
  //  start a fresh request
  useEffect(() => {
    const controller = new AbortController()

    const getPokemon = async () => {
      try {
        const res = await fetch(`${BASE_URL}/pokemon/${id}`, {
          signal: controller.signal
        })
        const pokemon = await res.json()
          setName(pokemon.name)
      } catch (e) {
        if (e instanceof Error && e.name !== 'AbortError') {
          setName('')
        }
      }
    }

    getPokemon()

    return () => {
      controller.abort()
    }
  }, [id])

  const handleClickNext = () => {
    setId(prev => prev + 1);
  }

  const handleClickPrev = () => {
    //  don't go below one
    setId(prev => Math.max(1, prev - 1))
  }

  return (
    <div>
      <h1>Pokemon Viewer</h1>
      <div>
        <p>{id}</p>
        <button onClick={handleClickPrev}>Previous</button>
        <button onClick={handleClickNext}>Next</button>
      </div>

      {name.length > 0 && (
        <div>
          <h2>{name}</h2>
        </div>
      )}
    </div>
  )
}
