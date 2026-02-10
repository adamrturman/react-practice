import { memo } from 'react';

interface JokeItemProps {
  setup: string;
  punchline: string;
}
const MemoizeJoke = memo(function JokeItem({setup, punchline}: JokeItemProps) {
  console.log('rendering joke')
  return (
    <>
      <p>{setup}</p>
      <p>{punchline}</p>
    </>
  );
});

export default MemoizeJoke;
