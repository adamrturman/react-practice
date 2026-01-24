import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Pokemon from './Pokemon';

function App() {
  const [count, setCount] = useState(0);

  //  flip a coin and either increment the count after one second,
  //  or throw an error and do nothing
  //  if the user spam clicks the button, no issues with stale state exist
  const incrementAsync = () => {
    return new Promise((resolve, reject) => {
      const shouldPass = Math.random() > 0.5;
      if (shouldPass) {
        setTimeout(() => {
          setCount(prevCount => prevCount + 1);
          resolve(true)
        }, 1000)
      } else {
        reject(new Error('Oops'))
      }
    })
  };

  const handleClick = async () => {
    try {
      await incrementAsync()
      console.log('Incremented!')
    } catch (error) {
      console.log('Failed:', error.message)
    }
  }

  return (
    <>
      <Pokemon />
      {/*<div>*/}
      {/*  <a href="https://vite.dev" target="_blank">*/}
      {/*    <img src={viteLogo} className="logo" alt="Vite logo" />*/}
      {/*  </a>*/}
      {/*  <a href="https://react.dev" target="_blank">*/}
      {/*    <img src={reactLogo} className="logo react" alt="React logo" />*/}
      {/*  </a>*/}
      {/*</div>*/}
      {/*<h1>Vite + React</h1>*/}
      {/*<div className="card">*/}
      {/*  <button onClick={handleClick}>*/}
      {/*    count is {count}*/}
      {/*  </button>*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.tsx</code> and save to test HMR*/}
      {/*  </p>*/}
      {/*</div>*/}
      {/*<p className="read-the-docs">*/}
      {/*  Click on the Vite and React logos to learn more*/}
      {/*</p>*/}
    </>
  )
}

export default App
