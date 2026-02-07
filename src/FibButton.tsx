import { memo } from 'react'

interface Props {
  onClick: () => void;
}

const FibButton = memo(function FibButton({onClick}: Props) {
  console.log('rendering fib button')
  return (
    <button onClick={onClick}>Increment fib</button>
  );
})

export default FibButton
