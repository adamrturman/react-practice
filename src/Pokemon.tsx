import { useEffect, useState } from 'react';

const BASE_URL = 'https://pokeapi.co/api/v2/';

export default function Pokemon() {
  const [id, setId] = useState(1);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (e) {
        if (e instanceof Error && e.name !== 'AbortError') {
          setName('')
        }
      }
    }

    const timeoutId = setTimeout(() => {
      //  explicitly state that the returned promise is ignored
      void getPokemon();
    }, 1000)

    return () => {
      clearTimeout(timeoutId);
      controller.abort()
    }
  }, [id]);

  //  these click handlers
  const handleClickNext = () => {
    setLoading(true);
    setId(prev => prev + 1);
  }

  const handleClickPrev = () => {
    setLoading(true);
    setId(prev => Math.max(1, prev - 1))
  }

  if (loading) {
    return <>Loading...</>
  }

  return (
    <div>
      <h1>Pokemon Viewer</h1>
      <div>
        <button disabled={id === 1} onClick={handleClickPrev}>Previous</button>
        <button onClick={handleClickNext}>Next</button>
      </div>
        <div>
          <p>{id}</p>
          {name.length > 0 && (
            <div>
              <h2>{name}</h2>
            </div>
          )}
        </div>
    </div>
  )
}
