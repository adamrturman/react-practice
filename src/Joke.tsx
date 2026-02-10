import { useMemo, useRef, useState } from 'react';
import MemoizeJoke from './JokeItem';

interface IJoke {
  id: string;
  setup: string;
  punchline: string;
}

export default function Joke() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [jokeList, setJokeList] = useState<Array<IJoke>>([]);
  const isThrottledRef = useRef(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  const fetchJoke = async () => {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await response.json();
      const jokeToAdd: IJoke = {
        id: crypto.randomUUID(),
        setup: data.setup,
        punchline: data.punchline,
      }
      setJokeList(previousJokeList => [...previousJokeList, jokeToAdd]);
    } catch {
      console.error('oops')
    }
  }

  const handleClick = async () => {
    //  only proceed if not throttled
    if (!isThrottledRef.current) {
      //  set the flag
      isThrottledRef.current = true;

      try {
      await fetchJoke();
      //  when the promise finishes resolving, then start the one second throttle
      } finally {
        setTimeout(() => {
          isThrottledRef.current = false;
        }, 1000);
      }
    }
  };


  const displayedJokes = jokeList.map(joke => {
      return (
        <MemoizeJoke key={joke.id} setup={joke.setup} punchline={joke.punchline} />
      );
    })

  //  don't recompute styles if only the list has changed and note the theme
  const styles = useMemo(() => {
    return {
      height: '100vh',
      width: '100vw',
      backgroundColor: isDarkMode ? 'black' : 'white',
      color: isDarkMode ? 'white' : 'black'
    };
  }, [isDarkMode]);


  return (
    <div style={styles}>
      <h1>Jokes</h1>
      <button onClick={toggleDarkMode}>Toggle theme</button>
      <button onClick={handleClick}>Fetch joke</button>
      {jokeList.length > 0 && displayedJokes}
    </div>
  );
}
