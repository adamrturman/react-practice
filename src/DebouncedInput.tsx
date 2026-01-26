import reactLogo from './assets/react.svg';

export default function DebouncedInput() {
  return (
    <>
      <input />
      <p>ID: </p>
      {/*The picture element allows us to define multiple sources */}
      {/*so the browser can render the appropriately-sized image*/}
      {/*We must provide a fallback generic img tag as well*/}
      <picture>
        <source srcSet="/src/assets/react.svg" media="(width <= 400px)"  />
        <source srcSet="/src/assets/vite.png" media="(width > 400px)"  />
        <img src={reactLogo} alt="React Logo"/>
      </picture>
    </>
  )
}
