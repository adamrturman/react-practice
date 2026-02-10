import { useState } from 'react';

export default function Weather() {
  const [zipCode, setZipCode] = useState('');



  return (
    <>
      <p>The weather today in {zipCode} is {weather}</p>
    </>
  );
}
